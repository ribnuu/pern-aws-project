const posBillpayQueries = require("./queries");

const getAllPendingBillHeadersInTheCompanyService = async ({
  filters,
  institutionIds,
}) => {
  try {
    const { loadBillsBy, fromDate, toDate, loadCustomerBills } = filters;

    if (loadBillsBy === "Return") {
      return await posBillpayQueries.getAllReturnBillHeadersInTheCompanyQuery({
        fromDate,
        toDate,
        institutionIds,
        loadCustomerBills,
      });
    }

    return await posBillpayQueries.getAllPendingBillHeadersInTheCompanyQuery({
      loadBillsBy,
      fromDate,
      toDate,
      institutionIds,
      loadCustomerBills,
    });
  } catch (error) {
    throw error;
  }
};

const getAllPendingBillHeadersByStockCustomerInstitutionIdService = async (
  stockCustomerInstitutionId,
  filters
) => {
  try {
    const { loadBillsBy } = filters;

    const data =
      await posBillpayQueries.getAllPendingBillHeadersByStockCustomerInstitutionIdQuery(
        stockCustomerInstitutionId,
        loadBillsBy
      );
    return data;
  } catch (error) {
    throw error;
  }
};

const makeBillPaymentService = async (reqBody) => {
  const { pendingBillsList, paymentDetails } = reqBody;

  try {
    let currentPayingAmount = 0;

    // Filter valid payment details and calculate the total amount being paid
    const validPaymentDetailsList = Object.entries(paymentDetails)
      .filter(([_, value]) => value?.valid)
      .map(([key, value]) => {
        currentPayingAmount += parseFloat(value.amount);
        return { ...value, payment_type: key };
      });

    // Calculate the total paying amount and grand total from pending bills
    const { currentPayingAmount2, grandTotal } = pendingBillsList.reduce(
      (acc, item) => {
        acc.currentPayingAmount2 += parseFloat(item.paying_amount);
        acc.grandTotal += parseFloat(item.grand_total);
        return acc;
      },
      { currentPayingAmount2: 0, grandTotal: 0 }
    );

    // Check if the total amounts match and are greater than zero
    if (
      currentPayingAmount === currentPayingAmount2 &&
      currentPayingAmount > 0 &&
      currentPayingAmount2 > 0
    ) {
      // Create the records in stock_billpay_header
      const stockBillPayHeaderId =
        await posBillpayQueries.insertStockBillpayHeaderQuery({
          grandTotal,
          createdBy: "created by user ida",
          paidAmount: currentPayingAmount2,
        });

      // Create the records in stock_billpay_details
      await Promise.all(
        pendingBillsList.map(async (pendingBill) => {
          console.log(pendingBill);
          const pendingBillNumber = pendingBill.bill_number;
          const pendingBillGrandTotal = parseFloat(pendingBill.grand_total);
          const pendingBillPayingAmount = parseFloat(pendingBill.paying_amount);
          const pendingBillPaidAmount = parseFloat(pendingBill.paid_amount);
          const balance_amount_to_pay =
            pendingBillGrandTotal -
            (pendingBillPayingAmount + pendingBillPaidAmount);

          const totalPaidAmount =
            pendingBillPaidAmount + pendingBillPayingAmount;
          const pendingBillBalanceAmount =
            pendingBillGrandTotal - totalPaidAmount;
          const isPaid = pendingBillBalanceAmount <= 0;

          // Insert details for each pending bill
          await posBillpayQueries.insertStockBillpayDetailQuery({
            billPayHeaderId: stockBillPayHeaderId,
            billNumber: pendingBillNumber,
            totalAmount: pendingBillGrandTotal,
            paidAmount: pendingBillPayingAmount,
            balanceAmount: pendingBillBalanceAmount,
            createdBy: "created by user ida",
          });

          // Update the stock bill header with the new paid amount and status
          await posBillpayQueries.updateStockBillHeaderQuery({
            billNumber: pendingBillNumber,
            paidAmount: totalPaidAmount,
            paidStatus: isPaid,
            balance_amount_to_pay: balance_amount_to_pay,
          });
        })
      );

      // Insert payment mode details for each valid payment
      await Promise.all(
        validPaymentDetailsList.map(async (item) => {
          const details = {
            billpayHeaderId: stockBillPayHeaderId,
            mode: item.type,
            tenderAmount: parseFloat(item.amount),
            balanceAmount: 0,
            createdBy: "created by user ida",
          };

          // Add specific fields for card payments
          if (item.payment_type === "card") {
            details.typeOfCard = item.type;
            details.last4digitsOfCard = item.last4Digits;
          }

          // Add specific fields for POS payments
          if (item.payment_type === "pos") {
            details.last4digitsOfCard = item.last4Digits;
            details.posReferenceNumber = item.referenceNumber;
          }

          // Add specific fields for cheque payments
          if (item.payment_type === "cheque") {
            details.chequeDate = item.chequeDate;
            details.chequeNumber = item.chequeNumber;
          }

          // Insert the payment mode details
          await posBillpayQueries.insertStockBillpayModeQuery(details);
        })
      );

      return true;
    } else {
      return false; // Return false if the total amounts do not match or are zero
    }
  } catch (error) {
    throw error; // Throw error if any operation fails
  }
};

module.exports = {
  getAllPendingBillHeadersInTheCompanyService,
  getAllPendingBillHeadersByStockCustomerInstitutionIdService,
  makeBillPaymentService,
};
