const cccPoliceTrafficOffenseInsightsService = require("../../services/ccc-police-traffic-offense-insights/service");

const getLicenseInHandByFiltersController = async (req, res) => {
  try {
    const filters = req.query;
    console.log(filters);

    if (!filters || Object.keys(filters).length <= 0) {
      res.send({ success: true, data: [] });
    } else {
      const data =
        await cccPoliceTrafficOffenseInsightsService.getLicenseInHandByFiltersService(
          filters
        );
      res.send({ success: true, data });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to get license in hand by filters",
    });
  }
};

module.exports = { getLicenseInHandByFiltersController };
