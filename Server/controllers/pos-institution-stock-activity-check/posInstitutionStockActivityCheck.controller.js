const posInstitutionStockActivityCheckService = require("../../services/pos-institution-stock-activity-check/service");

const getInstitutionStockActivityCheckDataController = async (req, res) => {
  const { filters } = req.body;
  try {
    const data =
      await posInstitutionStockActivityCheckService.getInstitutionStockActivityCheckDataService(
        { filters }
      );
    res.send({ success: true, data });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to load institution stock activity check data" });
  }
};

module.exports = {
  getInstitutionStockActivityCheckDataController,
};
