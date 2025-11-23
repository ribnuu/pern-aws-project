const posBillManagementService = require("../../services/pos-bill-management/service");

const getAllBillsInTheCompanyByFiltersController = async (req, res) => {
  try {
    const reqBody = req.body;
    const filters = req.body.filters;
    const data =
      await posBillManagementService.getAllBillsInTheCompanyByFiltersService({
        requestBody: reqBody,
        filters: filters,
      });
    res.send({ success: true, data });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed @ getAllBillsInTheCompanyByFiltersController" });
  }
};

const markBillAsDeletedByBillNumberController = async (req, res) => {
  try {
    const billNumber = req.params.billNumber;
    const data =
      await posBillManagementService.markBillAsDeletedByBillNumberService(
        billNumber
      );
    res.send({ success: true, data });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete bill by bill number" });
  }
};

module.exports = {
  getAllBillsInTheCompanyByFiltersController,
  markBillAsDeletedByBillNumberController,
};
