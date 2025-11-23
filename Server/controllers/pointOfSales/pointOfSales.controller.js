const fs = require("fs");
const path = require("path");

const pointOfSalesService = require("../../services/pointOfSales/pointOfSalesService");
const { formatDateWithMicroseconds } = require("../../utils/formatDateTime");
const { error, log } = require("console");

const getGRNDataByBillNumber = async (req, res) => {
  const { billNumber } = req.params;
  try {
    const data =
      await pointOfSalesService.getGRNDataByBillNumberService(billNumber);
    res.send({ success: true, data });
  } catch (error) {
    console.error("API Error:", error); // Log full error
    res.status(500).json({
      error: error.message || "Failed to load GRN data by bill number",
    });
  }
};

const getBillByBillNumberController = async (req, res) => {
  const { billNumber } = req.params;
  try {
    const data =
      await pointOfSalesService.generateBillByBillNumberService(billNumber);
    res.send({ success: true, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to load bill by bill number" });
  }
};

// controller for fetch stock bill details by bill number
const getStockBillDetailByBillNumber = async (req, res) => {
  const { billNumber } = req.params;
  try {
    const data =
      await pointOfSalesService.getStockBillByBillNumberService(billNumber);
    res.send({ success: true, data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to load bill by bill number" });
  }
};

//controller for fetch customer orders deatils
const getStockCustomerOrdersDetails = async (req, res) => {
  try {
    const data = await pointOfSalesService.getStockCustomerOrders();
    res.send({ success: true, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch Customer Order Details" });
  }
};

//controller for fetch customer order details
const getStockCustomerOrdersDetailsByOrderNumber = async (req, res) => {
  const { orderNumber } = req.params;
  try {
    const data =
      await pointOfSalesService.getStockCustomerOrdersByOrderNumber(
        orderNumber
      );
    res.send({ success: true, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch Customer Order Details" });
  }
};

const createStockBillDetailController = async (req, res) => {
  const {
    items = [],
    customerName = "",
    customerNumber = "",
    typeOfPayment = "",
    tenderAmount = 0,
    last4DigitsOfCard = "",
    typeOfCard = "",
    userId = "",
    isGrnEnabled = false,
    isBillToCompany = false,
    isEnabledStockManagement,
    stockCustomerInstitutionData,
    stockCustomerInstitutionId,
    // ! temp field
    // billDateTime = null,
  } = req.body;

  // const formatedBillDateTime = formatDateWithMicroseconds(billDateTime);

  try {
    const { billNumber, stockBillDetailData } =
      await pointOfSalesService.createStockBillsDetailsFromListService({
        items: items,
        customerName: customerName,
        customerNumber: customerNumber,
        typeOfPayment: typeOfPayment,
        tenderAmount: tenderAmount,
        last4DigitsOfCard: last4DigitsOfCard,
        typeOfCard: typeOfCard,
        userId: userId,
        isGrnEnabled: isGrnEnabled,
        isBillToCompany: isBillToCompany,
        // ! temp field
        // billDateTime: formatedBillDateTime,
        //
        isEnabledStockManagement: isEnabledStockManagement,
        stockCustomerInstitutionData: stockCustomerInstitutionData,
        stockCustomerInstitutionId: stockCustomerInstitutionId,
      });
    res.send({ success: true, billNumber, userId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create stock bill detail" });
  }
};

const createStockReturnBillDetailController = async (req, res) => {
  const {
    items = [],
    customerName = "",
    customerNumber = "",
    billNumber = "",
    userId = "",
    isGrnEnabled = false,
    isBillToCompany = false,
    isEnabledStockManagement,
    stockCustomerInstitutionData,
    stockCustomerInstitutionId,
  } = req.body;

  try {
    const response =
      await pointOfSalesService.createStockReturnBillsDetailsFromListService({
        items: items,
        customerName: customerName,
        customerNumber: customerNumber,
        billNumber: billNumber,
        userId: userId,
        isGrnEnabled: isGrnEnabled,
        isBillToCompany: isBillToCompany,
        isEnabledStockManagement: isEnabledStockManagement,
        stockCustomerInstitutionData: stockCustomerInstitutionData,
        stockCustomerInstitutionId: stockCustomerInstitutionId,
      });

    console.log("response:", response);

    res.send({ success: true });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Failed to create stock return bill detail" });
  }
};

//
const createStockCustomerOrderController = async (req, res) => {
  const {
    items = [],
    customerName = "",
    customerNumber = "",
    typeOfPayment = "",
    tenderAmount = 0,
    last4DigitsOfCard = "",
    typeOfCard = "",
    userId = "",
    order_billed = "not billed",
    isGrnEnabled = false,
    isCollection = false,
    isDamageReplacement = false,
    isBillToCompany = false,
    isEnabledStockManagement = false,
    stockCustomerInstitutionData = {},
    stockCustomerInstitutionId = "",
    deliveryDate = null,
    remark = "",
    // billDateTime = null, // temp field
  } = req.body;

  try {
    const { orderNumber, stockBillDetailData } =
      await pointOfSalesService.createCustomerOrderService({
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
        isEnabledStockManagement,
        stockCustomerInstitutionData,
        stockCustomerInstitutionId,
        deliveryDate,
        remark,
      });

    res.send({ success: true, orderNumber, userId });
  } catch (err) {
    console.error("Error creating stock customer order:", err.message);
    res
      .status(500)
      .json({ error: "Failed to create stock customer order details" });
  }
};

const getAllItemsByCompanyIdController = async (req, res) => {
  const { companyId } = req.params;

  try {
    const data =
      await pointOfSalesService.getAllItemsByCompanyIdService(companyId);
    res.send({ success: true, data: data.rows, rowCount: data.rowCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create stock bill detail" });
  }
};

const getAllItemsByCompanyIdFromStockItemsHeaderController = async (
  req,
  res
) => {
  const { companyId } = req.params;

  try {
    const data =
      await pointOfSalesService.getAllItemsByCompanyIdFromStockItemsHeaderService(
        companyId
      );
    res.send({ success: true, data: data.rows, rowCount: data.rowCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to getAllItemsByCompanyIdFromStockItemsHeaderController",
    });
  }
};

const createStockGRNRecordController = async (req, res) => {
  const { formData, items, billHeaderData, signatureImage } = req.body;
  console.log(req.body);
  try {
    const data = await pointOfSalesService.createStockGRNRecordService({
      userData: formData,
      productData: items,
      billHeaderData,
      signatureImage,
    });
    res.send(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to create stock GRN RECORD" });
  }
};

const searchProductsFromStockItemHeaderController = async (req, res) => {
  const { searchTerm } = req.body;
  try {
    const data =
      await pointOfSalesService.searchProductsFromStockItemHeaderService(
        searchTerm
      );
    res.send({ success: true, data: data.rows, rowCount: data.rowCount });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to search product from stock item header" });
  }
};

const getStockCustomerInstitutionDataByStockCustomerPersonMobileNumberController =
  async (req, res) => {
    const { mobileNumber } = req.body;

    try {
      const data =
        await pointOfSalesService.getStockCustomerInstitutionDataByStockCustomerPersonMobileNumberService(
          mobileNumber
        );
      res.send({ success: true, data: data });
    } catch (error) {
      res.status(500).json({
        error: "Faile to get stock data by stock customer person mobile number",
      });
    }
  };

const searchStockBillHeaderController = async (req, res) => {
  const { searchTerm } = req.body;
  try {
    const data =
      await pointOfSalesService.searchStockBillHeaderService(searchTerm);
    res.send({ success: true, data: data.rows, rowCount: data.rowCount });
  } catch (error) {
    res.status(500).json({ error: "Failed to search stock bill header" });
  }
};

const searchStockCustomerInstitutionController = async (req, res) => {
  const { searchTerm, loadAll, loadRepresentative, loadAddress } = req.body;
  try {
    const data =
      await pointOfSalesService.searchStockCustomerInstitutionService(
        searchTerm,
        loadAll,
        loadRepresentative,
        loadAddress
      );
    res.send({ success: true, data: data, rowCount: data.rowCount });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to search stock customer insitution" });
  }
};

const updateCustomerOrderHeaderController = async (req, res) => {
  const { orderNumber } = req.params;
  const { orderBilled } = req.body;

  try {
    const result =
      await pointOfSalesService.updateStockCustomerOrderHeaderService(
        orderNumber,
        orderBilled
      );

    if (result) {
      return res
        .status(200)
        .json({ success: true, message: "Order billed updated successfully." });
    } else {
      return res.status(404).json({ error: "Order not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update customer order header" }); // Fixed typo here
  }
};

module.exports = {
  createStockBillDetailController,
  createStockCustomerOrderController,
  createStockReturnBillDetailController,
  getBillByBillNumberController,
  getAllItemsByCompanyIdController,
  getStockCustomerOrdersDetails,
  createStockGRNRecordController,
  getGRNDataByBillNumber,
  searchProductsFromStockItemHeaderController,
  getStockCustomerInstitutionDataByStockCustomerPersonMobileNumberController,
  getStockBillDetailByBillNumber,
  getAllItemsByCompanyIdFromStockItemsHeaderController,
  searchStockBillHeaderController,
  searchStockCustomerInstitutionController,
  updateCustomerOrderHeaderController,
  getStockCustomerOrdersDetailsByOrderNumber,
};
