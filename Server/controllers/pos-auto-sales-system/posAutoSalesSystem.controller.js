const posAutoSalesSystemService = require("../../services/pos-auto-sales-system/service");

const getFirstBillsForEachInstitutionController = async (req, res) => {
  try {
    const data =
      await posAutoSalesSystemService.getFirstBillsForEachInstitutionService();
    res.send({ success: true, data });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed @ getFirstBillsForEachInstitutionController" });
  }
};

module.exports = {
  getFirstBillsForEachInstitutionController,
};
