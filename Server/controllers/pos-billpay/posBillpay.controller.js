const posBillPayServices = require("../../services/pos-billpay/service");

const getAllPendingBillHeadersInTheCompanyController = async (req, res) => {
  const { filters } = req.body;
  const institutionIdsList = req.institution_ids;

  try {
    const data =
      await posBillPayServices.getAllPendingBillHeadersInTheCompanyService({
        filters,
        institutionIds: institutionIdsList,
      });
    res.send({ success: true, data: data });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to getAllPendingBillHeadersInTheCompanyController",
    });
  }
};

const getAllPendingBillHeadersByStockCustomerInstitutionIdController = async (
  req,
  res
) => {
  const { stockCustomerInstitutionId, filters } = req.body;

  try {
    const data =
      await posBillPayServices.getAllPendingBillHeadersByStockCustomerInstitutionIdService(
        stockCustomerInstitutionId,
        filters
      );
    res.send({ success: true, data: data.rows });
  } catch (error) {
    res.status(500).json({
      error:
        "Failed to getAllPendingBillHeadersByStockCustomerInstitutionIdController",
    });
  }
};

const makeBillPaymentController = async (req, res) => {
  try {
    const reqBody = req.body;
    const data = await posBillPayServices.makeBillPaymentService(reqBody);
    res.send({ success: true, data: data });
    // res.send({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({
      error: "Failed to make a bill payment",
    });
  }
};

module.exports = {
  getAllPendingBillHeadersInTheCompanyController,
  getAllPendingBillHeadersByStockCustomerInstitutionIdController,
  makeBillPaymentController,
};
