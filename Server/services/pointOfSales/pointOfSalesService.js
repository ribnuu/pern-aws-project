const path = require("path");
const pointOfSalesQueries = require("./pointOfSalesQueries");
require("dotenv").config();
const { sendSingleSmsHutch } = require("../../helpers/hutchSmsService");
const {
  // generateCustomBillNumber,
  generateCustomGrnNumber,
} = require("../../helpers/posHelpers");
const billPayQueries = require("../pos-billpay/queries");

const { saveImage, readImage } = require("../../utils/saveImage");
const { generateBillNumber } = require("../../helpers/pos/generateBillNumber");
const { da } = require("date-fns/locale");
const { log } = require("console");

/**
 * Service function to generate bill details by bill number.
 * Retrieves both header and detail information for the given bill number.
 * @param {string} billNumber - The bill number to fetch details for.
 * @returns {Promise<Object|null>} - Returns a promise resolving to the bill details object or null if not found.
 * @throws {Error} - Throws an error if database operation fails.
 */
const generateBillByBillNumberService = async (billNumber) => {
  try {
    // Fetch bill header details
    const rows =
      await pointOfSalesQueries.generateBillByBillNumberQuery(billNumber);
    return rows;
  } catch (error) {
    console.error(`Error in generateBillByBillNumber: ${error.message}`);
    throw new Error("Failed to generate bill details.");
  }
};

const getGRNDataByBillNumberService = async (billNumber) => {
  try {
    const rows =
      await pointOfSalesQueries.getGRNDataByBillNumberQuery(billNumber);

    const imageData = await readImage(rows.header.header.received_by_signature);
    // res.json({ imageData: `data:image/png;base64,${data}` });

    return { ...rows, imageData };
  } catch (error) {
    console.error(`Error in getGRNDataByBillNumberService: ${error.message}`);
    throw new Error("Failed to get GRN data");
  }
};

/**
 * Service function to create a stock bill detail entry in the database.
 * Inserts a new record into the stock_bill_detail table with provided details.
 * @param {string} billNumber - The bill number associated with the stock bill.
 * @param {string} itemCode - The item code for the stock item.
 * @param {number} quantity - The quantity of the item purchased.
 * @param {number} amount - The amount per unit of the item.
 * @param {number} total - The total amount for the item line.
 * @returns {Promise<Object|null>} - Returns a promise resolving to the created stock bill detail data or null if insertion fails.
 * @throws {Error} - Throws an error if database operation fails.
 */
const createStockBillDetailService = async (
  billNumber,
  itemCode,
  quantity,
  amount,
  total
) => {
  try {
    // Insert stock bill detail into database
    const stockBillDetailData =
      await pointOfSalesQueries.insertStockBillDetailQuery(
        billNumber,
        itemCode,
        quantity,
        amount,
        total
      );
    return stockBillDetailData;
  } catch (error) {
    console.log(error); // Log the error for debugging purposes
    throw error;
  }
};

/**
 * Service function to create stock bill details and header from a list of items.
 * Inserts multiple records into the stock_bill_detail table and a corresponding record into stock_bill_header.
 * Calculates grand total and balance based on provided data.
 * @param {Object} data - Object containing items array and billing details.
 * @param {Array<Object>} data.items - Array of items with details to be billed.
 * @param {string} data.customerName - Customer name associated with the bill.
 * @param {string} data.customerNumber - Customer number associated with the bill.
 * @param {string} data.typeOfPayment - Type of payment used for the bill.
 * @param {number} data.tenderAmount - Tender amount paid by the customer.
 * @param {string} data.last4DigitsOfCard - Last 4 digits of the payment card used.
 * @param {string} data.typeOfCard - Type of payment card used.
 * @returns {Promise<Array<Object>|null>} - Returns a promise resolving to the created stock bill detail data or null if insertion fails.
 * @throws {Error} - Throws an error if database operation fails.
 */
const createStockBillsDetailsFromListService = async ({
  items,
  customerName,
  customerNumber,
  typeOfPayment,
  tenderAmount,
  last4DigitsOfCard,
  typeOfCard,
  userId,
  isGrnEnabled,
  isBillToCompany,
  // billDateTime,
  isEnabledStockManagement,
  stockCustomerInstitutionData,
  stockCustomerInstitutionId,
}) => {
  try {
    // console.log(items);
    const billNumber = await generateBillNumber();

    if (!billNumber || billNumber === null) {
      return null;
    }

    // Create customer record in Stock Customer Person table
    const stockCustomerPersonId =
      await pointOfSalesQueries.insertStockCustomerPersonQuery({
        name: customerName,
        address: null,
        mobile_number: customerNumber,
        stock_customer_institution_id: stockCustomerInstitutionId,
        isBillToCompany: isBillToCompany,
      });

    // Generate a unique bill number
    // const billNumber = generateCustomBillNumber(userId.slice(-4));

    // Insert stock bill details into database
    const stockBillDetailData =
      await pointOfSalesQueries.insertStockBillDetailsFromListQuery(
        items,
        billNumber,
        isEnabledStockManagement
      );

    // Calculate grand total from the stock bill detail data
    let grandTotal = 0.0;
    stockBillDetailData.forEach((item) => {
      grandTotal += parseFloat(item.total);
      console.log(item);
    });

    // calculate total discount
    let totalDiscount = 0.0;
    stockBillDetailData.forEach((item) => {
      totalDiscount += parseFloat(item.discount_amount);
    });

    //calculate total(Before discount reduction)
    let total = 0.0;
    stockBillDetailData.forEach((item) => {
      total += parseFloat(item.grand_total);
      console.log(item);
    });

    // Calculate discount percentage
    const discountPercentage = total > 0 ? (totalDiscount / total) * 100 : 0;

    // Calculate balance
    let balance = 0;
    if (tenderAmount <= 0) {
      balance = grandTotal;
    } else if (grandTotal > tenderAmount) {
      balance = grandTotal - tenderAmount;
    } else {
      balance = tenderAmount - grandTotal;
    }

    // Calculate the amount pending to pay - this is the amount that the customer has to pay (maybe he gave 3000 for a 5000 bill, so the balance_amount_to_pay is 2000)
    let balance_amount_to_pay = 0;
    if (grandTotal > tenderAmount) {
      balance_amount_to_pay = parseFloat(grandTotal) - parseFloat(tenderAmount);
    }

    // Calculate Paid Amount -  Not the tendererd amount
    let paidAmount = 0;
    const paidStatus = tenderAmount >= grandTotal ? true : false;
    if (paidStatus) {
      paidAmount = grandTotal;
    } else {
      paidAmount = tenderAmount;
    }

    let stockBillPayHeaderId = null;

    if (typeOfPayment !== "credit") {
      // Insert Stock Bill Header Query
      stockBillPayHeaderId = await billPayQueries.insertStockBillpayHeaderQuery(
        {
          grandTotal: grandTotal,
          createdBy: userId,
          paidAmount: tenderAmount,
        }
      );

      await billPayQueries.insertStockBillpayModeQuery({
        billpayHeaderId: stockBillPayHeaderId,
        mode: typeOfPayment,
        tenderAmount: tenderAmount,
        balanceAmount: balance,
        typeOfCard: typeOfCard,
        last4digitsOfCard: last4DigitsOfCard,
        chequeDate: null,
        chequeNumber: null,
        createdBy: userId,
        posReferenceNumber: "",
      });
    }

    // Insert Stock Bill Header Query
    await pointOfSalesQueries.insertStockBillHeaderQuery({
      grandTotal,
      total,
      totalDiscount,
      discountPercentage,
      billNumber: billNumber, // Assuming bill_number is the same for all items
      balance_amount_to_pay: balance_amount_to_pay,
      customerName,
      customerNumber,
      tenderAmount,
      typeOfPayment,
      last4DigitsOfCard,
      typeOfCard,
      isGrnEnabled,
      paidStatus: paidStatus,
      stockCustomerPersonId: stockCustomerPersonId,
      isBillToCompany: isBillToCompany,
      paidAmount: paidAmount,
      stockCustomerInstitutionId: isBillToCompany
        ? stockCustomerInstitutionData?.stock_customer_institution?.id
        : null,
      stockBillPayHeaderId: "", // not used
      isEnabledStockManagement: isEnabledStockManagement,
      // ! temp field
      // billDateTime: billDateTime,
    });

    if (typeOfPayment !== "credit") {
      await billPayQueries.insertStockBillpayDetailQuery({
        billPayHeaderId: stockBillPayHeaderId,
        billNumber: billNumber,
        totalAmount: grandTotal,
        paidAmount: paidAmount,
        balanceAmount: balance,
        createdBy: userId,
      });
    }

    const frontend_url = process.env.FRONTEND_HOSTED_URL;

    // Send the bill through SMS
    await sendSingleSmsHutch(
      customerNumber,
      `${frontend_url}/pos/bln/${billNumber}`
    );

    return { stockBillDetailData, billNumber };
  } catch (error) {
    console.log(error); // Log the error for debugging purposes
  }
};

const createStockReturnBillsDetailsFromListService = async ({
  items,
  billNumber,
  customerName,
  customerNumber,
  userId,
  isGrnEnabled,
  isBillToCompany,
  // billDateTime,
  isEnabledStockManagement,
  stockCustomerInstitutionData,
  stockCustomerInstitutionId,
}) => {
  //genarate return bill number
  const returnBillNumber = await generateBillNumber();

  // Insert stock bill details into database
  const insertedItems =
    await pointOfSalesQueries.insertStockReturnBillDetailsFromListQuery(
      items,
      returnBillNumber,
      isEnabledStockManagement
    );

  console.log(insertedItems);

  const grandTotal = insertedItems.reduce(
    (acc, item) => acc + Number(item.grand_total),
    0
  );
  const total = insertedItems.reduce(
    (acc, item) => acc + Number(item.total),
    0
  );
  const totalDiscount = insertedItems.reduce(
    (acc, item) => acc + Number(item.discount_amount),
    0
  );

  // Insert Stock Return Bill Header Query
  await pointOfSalesQueries.insertStockReturnBillHeaderQuery({
    returnBillNumber: returnBillNumber, // Assuming return_bill_number is the same for all items
    billNumber: billNumber,
    userId: userId,
    customerName,
    customerNumber,
    isGrnEnabled,
    grandTotal,
    total,
    totalDiscount,
    // stockCustomerPersonId:stockCustomerPersonId,
    isBillToCompany: isBillToCompany,
    stockCustomerInstitutionId: isBillToCompany
      ? stockCustomerInstitutionData?.stock_customer_institution?.id
      : null,
    isEnabledStockManagement: isEnabledStockManagement,
    // billDateTime: billDateTime,
  });
};

//
const createCustomerOrderService = async ({
  items,
  customerName,
  customerNumber,
  typeOfPayment,
  tenderAmount,
  last4DigitsOfCard,
  typeOfCard,
  userId,
  isGrnEnabled,
  isCollection,
  isDamageReplacement,
  isBillToCompany,
  // billDateTime,
  isEnabledStockManagement,
  stockCustomerInstitutionData,
  stockCustomerInstitutionId,
  deliveryDate,
  remark,
}) => {
  try {
    const orderNumber = await generateBillNumber();

    if (!orderNumber || orderNumber === null) {
      return null;
    }

    // Create customer record in Stock Customer Person table
    const stockCustomerPersonId =
      await pointOfSalesQueries.insertStockCustomerPersonQuery({
        name: customerName,
        address: null,
        mobile_number: customerNumber,
        stock_customer_institution_id: stockCustomerInstitutionId,
        isBillToCompany: isBillToCompany,
      });

    // Generate a unique bill number
    // const orderNumber = generateCustomorderNumber(userId.slice(-4));

    // Insert stock bill details into database
    const stockBillDetailData =
      await pointOfSalesQueries.insertStockCustomerOrderFromListQuery(
        items,
        orderNumber,
        isEnabledStockManagement
      );

    // Calculate grand total from the stock bill detail data
    let grandTotal = 0.0;
    stockBillDetailData.forEach((item) => {
      grandTotal += parseFloat(item.total);
      console.log("AJHDSFSKJFHSDLKFJDSKLFJDKDGDFGFD:", item);
    });

    // Calculate balance
    let balance = 0;
    if (tenderAmount <= 0) {
      balance = grandTotal;
    } else if (grandTotal > tenderAmount) {
      balance = grandTotal - tenderAmount;
    } else {
      balance = tenderAmount - grandTotal;
    }

    // Calculate the amount pending to pay - this is the amount that the customer has to pay (maybe he gave 3000 for a 5000 bill, so the balance_amount_to_pay is 2000)
    let balance_amount_to_pay = 0;
    if (grandTotal > tenderAmount) {
      balance_amount_to_pay = parseFloat(grandTotal) - parseFloat(tenderAmount);
    }

    // Calculate Paid Amount -  Not the tendererd amount
    let paidAmount = 0;
    const paidStatus = tenderAmount >= grandTotal ? true : false;
    if (paidStatus) {
      paidAmount = grandTotal;
    } else {
      paidAmount = tenderAmount;
    }

    let stockBillPayHeaderId = null;

    if (typeOfPayment !== "credit") {
      // Insert Stock Bill Header Query
      stockBillPayHeaderId =
        await billPayQueries.insertStockCustomerOrderPayHeaderQuery({
          grandTotal: grandTotal,
          createdBy: userId,
          paidAmount: tenderAmount,
        });

      await billPayQueries.insertStockCustomerOrderPayModeQuery({
        billpayHeaderId: stockBillPayHeaderId,
        mode: typeOfPayment,
        tenderAmount: tenderAmount,
        balanceAmount: balance,
        typeOfCard: typeOfCard,
        last4digitsOfCard: last4DigitsOfCard,
        chequeDate: null,
        chequeNumber: null,
        createdBy: userId,
        posReferenceNumber: "",
      });
    }

    // Insert Stock Bill Header Query
    await pointOfSalesQueries.insertStockCustomerOrderHeaderQuery({
      grandTotal,
      deliveryDate,
      remark,
      orderNumber: orderNumber, // Assuming bill_number is the same for all items
      balance_amount_to_pay: balance_amount_to_pay,
      customerName,
      customerNumber,
      tenderAmount,
      typeOfPayment,
      last4DigitsOfCard,
      typeOfCard,
      isGrnEnabled,
      isCollection,
      isDamageReplacement,
      paidStatus: paidStatus,
      stockCustomerPersonId: stockCustomerPersonId,
      isBillToCompany: isBillToCompany,
      paidAmount: paidAmount,
      stockCustomerInstitutionId: isBillToCompany
        ? stockCustomerInstitutionData?.stock_customer_institution?.id
        : null,
      stockBillPayHeaderId: "", // not used
      isEnabledStockManagement: isEnabledStockManagement,
      // ! temp field
      // billDateTime: billDateTime,
    });

    if (typeOfPayment !== "credit") {
      await billPayQueries.insertStockCustomerOrderPayDetailQuery({
        billPayHeaderId: stockBillPayHeaderId,
        orderNumber: orderNumber,
        totalAmount: grandTotal,
        paidAmount: paidAmount,
        balanceAmount: balance,
        createdBy: userId,
      });
    }

    const frontend_url = process.env.FRONTEND_HOSTED_URL;

    // Send the bill through SMS
    await sendSingleSmsHutch(
      customerNumber,
      `${frontend_url}/pos/bln/${orderNumber}`
    );

    return { stockBillDetailData, orderNumber };
  } catch (error) {
    console.log(error); // Log the error for debugging purposes
  }
};

const getAllItemsByCompanyIdService = async (companyId) => {
  try {
    const data =
      await pointOfSalesQueries.getAllItemsByCompanyIdQuery(companyId);
    return data;
  } catch (error) {
    throw error;
  }
};

const createStockGRNRecordService = async ({
  userData,
  productData = [],
  billHeaderData = {},
  signatureImage = null,
}) => {
  try {
    const isRecordExist =
      await pointOfSalesQueries.checkIfGrnHeaderRecordExistsQuery(
        billHeaderData.bill_number
      );

    if (isRecordExist) {
      return { success: false, message: "GRN record already exists" };
    }

    // Calculate the grand total based on edited or original values
    const grandTotal = productData.reduce((gTotal, item) => {
      if (item.edited_values && item.edited_values.quantity) {
        // Use edited quantity if available, calculate total amount
        return (
          gTotal +
          parseInt(item.edited_values.quantity) * item.stock_bill_detail.amount
        );
      } else {
        // Use original total if no edited quantity, calculate total amount
        return gTotal + parseFloat(item.stock_bill_detail.total);
      }
    }, 0);

    // Generate a custom GRN number
    const grnNumber = generateCustomGrnNumber();

    const signatureFolderPath = "C:\\ccc\\DataStore\\GrnSignature";
    const signatureIageFileName = `${grnNumber}.png`;
    const signatureImageFilePathToSaveInDb = path.join(
      signatureFolderPath,
      signatureIageFileName
    ); // This path will be saved in the database

    // Save the signature image
    await saveImage(signatureFolderPath, signatureIageFileName, signatureImage);

    // Insert GRN header information into the database
    await pointOfSalesQueries.insertStockGRNHeaderQuery({
      grnNumber: grnNumber,
      billNumber: billHeaderData.bill_number,
      grnUserId: userData.userId,
      receivedByName: userData.name,
      receivedByNic: userData.nic,
      // receivedBySignature: userData.signature,
      receivedBySignature: signatureImageFilePathToSaveInDb,
      grandTotal: grandTotal,
      supplierId: "supplierId", // Replace with actual supplier ID
    });

    await Promise.all(
      productData.map(async (item) => {
        console.log(item);
        // New Batch Number
        const batchNumber = item?.stock_balance_update?.batch_number;
        const newBatchNumber = batchNumber ? parseInt(batchNumber) + 1 : 1; // Default to 1 if batch number is not available
        const formattedBatchNumber = newBatchNumber.toString().padStart(4, "0"); // Format to 4 digits with leading zeros

        // Cost
        const cost =
          parseFloat(item.stock_bill_detail.amount) ||
          item.stock_bill_detail.mrp;

        // Expiry Date
        let updatedExpiryDate = null;
        try {
          if (item?.edited_values?.expiry_date) {
            // Pick the expiry date from the edited values
            const editedDate = new Date(item.edited_values.expiry_date);
            updatedExpiryDate = editedDate.toISOString().split("T")[0];
          } else {
            if (billHeaderData.is_stock_maintained) {
              // Pick the expiry date from the stock_balance_update
              productData;
              const editedDate = new Date(
                item.stock_balance_update.expiry_date
              );
              updatedExpiryDate = editedDate.toISOString().split("T")[0];
            } else {
              // Pick the date from the stock_item_detail
              const editedDate = new Date(item.stock_item_detail.expiry_date);
              updatedExpiryDate = editedDate.toISOString().split("T")[0];
            }
          }
        } catch (error) {
          console.log(error);
        }

        // try {
        //   if (item.edited_values && item.edited_values.expiry_date) {
        //     // Validate and parse expiry_date from edited_values
        //     const editedDate = new Date(item.edited_values.expiry_date);
        //     if (!isNaN(editedDate.getTime())) {
        //       updatedExpiryDate = editedDate.toISOString().split("T")[0];
        //     } else {
        //       console.error("Invalid expiry date in edited_values");
        //     }
        //   } else if (
        //     item.stock_bill_detail &&
        //     item.stock_bill_detail.expiry_date
        //   ) {
        //     // Validate and parse expiry_date from stock_bill_detail
        //     const stockDate = new Date(item.stock_bill_detail.expiry_date);
        //     if (!isNaN(stockDate.getTime())) {
        //       updatedExpiryDate = stockDate.toISOString().split("T")[0];
        //     } else {
        //       console.error("Invalid expiry date in stock_bill_detail");
        //     }
        //   } else {
        //     console.warn("No expiry date found in item");
        //   }
        // } catch (error) {
        //   console.error("Error processing expiry date:", error);
        // }

        // Use updatedExpiryDate as needed
        console.log(`Updated Expiry Date: ${updatedExpiryDate}`);

        let updatedQty =
          item?.edited_values &&
          item?.edited_values?.quantity !== undefined &&
          item?.edited_values?.quantity !== null
            ? parseInt(item.edited_values.quantity, 10)
            : parseInt(item.stock_bill_detail.quantity, 10);

        let updatedItemMrp = 0.0;
        if (item?.edited_values?.item_mrp) {
          updatedItemMrp = parseInt(item.edited_values.item_mrp, 10);
        } else {
          if (billHeaderData.is_stock_maintained) {
            updatedItemMrp = parseInt(item.stock_balance_update.item_mrp, 10);
          } else {
            updatedItemMrp = parseInt(item.stock_item_detail.mrp, 10);
          }
        }

        // let updatedItemMrp = item?.edited_values?.item_mrp
        //   ? parseInt(item.edited_values.item_mrp)
        //   : parseInt(item.stock_balance_update.item_mrp);

        const updatedCostTotal = updatedQty * cost;

        await pointOfSalesQueries.insertStockGRNDetailQuery({
          grnNumber: grnNumber,
          item_code: item.stock_item_header.item_code,
          item_qty: updatedQty,
          cost: cost,
          mrp: updatedItemMrp,
          cost_total: updatedCostTotal,
          batch_number: formattedBatchNumber,
          expiry_date: updatedExpiryDate,
        });

        // await pointOfSalesQueries.insertStockItemDetailQuery({
        //   item_code: item.stock_item_header.item_code,
        //   grn_number: grnNumber,
        //   batch_number: formattedBatchNumber,
        //   expiry_date: updatedExpiryDate,
        // });

        await pointOfSalesQueries.createStockTransactionUpdateQuery({
          transactionId: grnNumber,
          cost: cost,
          mrp: updatedItemMrp,
          batchNumber: formattedBatchNumber,
          qty: updatedQty,
          expiryDate: updatedExpiryDate,
          createdBy: "user1",
          database_name: "pos_database_external",
          item_code: item.stock_item_header.item_code,
        });

        return pointOfSalesQueries.insertStockBalanceUpdateQuery({
          item_code: item.stock_item_header.item_code,
          batch_number: formattedBatchNumber,
          balance: updatedQty,
          item_cost: item.stock_bill_detail.amount,
          item_mrp: updatedItemMrp,
          expiry_date: updatedExpiryDate,
        });
      })
    );

    return { success: true, message: "Succesfully updated grn" }; // Return true upon successful completion
  } catch (error) {
    throw error; // Throw any errors encountered during execution
  }
};

const searchProductsFromStockItemHeaderService = async (searchString) => {
  try {
    // Insert stock bill detail into database
    const stockBillDetailData =
      await pointOfSalesQueries.searchProductsFromStockItemHeader(searchString);
    return stockBillDetailData;
  } catch (error) {
    console.log(error); // Log the error for debugging purposes
    throw error;
  }
};

const getStockCustomerInstitutionDataByStockCustomerPersonMobileNumberService =
  async (mobileNumber) => {
    try {
      const data =
        await pointOfSalesQueries.getStockCustomerInstitutionDataByStockCustomerPersonMobileNumberQuery(
          mobileNumber
        );
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

const getAllItemsByCompanyIdFromStockItemsHeaderService = async (companyId) => {
  try {
    const data =
      await pointOfSalesQueries.getAllItemsByCompanyIdFromStockItemsHeaderQuery(
        companyId
      );
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// fetch stock bill according to bill number
const getStockBillByBillNumberService = async (billNumber) => {
  try {
    const data =
      await pointOfSalesQueries.getStockBillByBillNumberQuery(billNumber);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const searchStockBillHeaderService = async (searchTerm) => {
  try {
    const data =
      await pointOfSalesQueries.searchStockBillHeaderQuery(searchTerm);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getStockCustomerOrders = async () => {
  try {
    const data = await pointOfSalesQueries.getStockCustomerOrderDetails();

    return data;
  } catch (error) {
    console.log("Error in fetch customer orders");
    throw new Error("Failed to get Customer Orders");
  }
};

const getStockCustomerOrdersByOrderNumber = async (orderNumber) => {
  try {
    const data =
      await pointOfSalesQueries.getStockCustomerOrderDetailsByOrderNumber(
        orderNumber
      );

    return data;
  } catch (error) {
    console.log("Error in fetch customer orders");
    throw new Error("Failed to get Customer Orders");
  }
};

const searchStockCustomerInstitutionService = async (
  searchString,
  loadAll,
  loadRepresentative,
  loadAddress
) => {
  try {
    const data = await pointOfSalesQueries.searchStockCustomerInstitutionQuery(
      searchString,
      loadAll,
      loadRepresentative,
      loadAddress
    );
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateStockCustomerOrderHeaderService = async (
  orderNumber,
  orderBilled
) => {
  try {
    const data = await pointOfSalesQueries.updateStockCustomerOrderHeaderQuery(
      orderNumber,
      orderBilled
    );
    return data;
  } catch (err) {
    // Fixed variable name to match the parameter
    console.log(err); // Log `err` instead of `error`
    throw err; // Throw `err` instead of `error`
  }
};

module.exports = {
  createStockBillDetailService,
  createStockReturnBillsDetailsFromListService,
  createCustomerOrderService,
  createStockBillsDetailsFromListService,
  generateBillByBillNumberService,
  getAllItemsByCompanyIdService,
  createStockGRNRecordService,
  getGRNDataByBillNumberService,
  searchProductsFromStockItemHeaderService,
  getStockCustomerInstitutionDataByStockCustomerPersonMobileNumberService,
  getAllItemsByCompanyIdFromStockItemsHeaderService,
  searchStockBillHeaderService,
  searchStockCustomerInstitutionService,
  getStockBillByBillNumberService,
  getStockCustomerOrders,
  getStockCustomerOrdersByOrderNumber,
  updateStockCustomerOrderHeaderService,
};
