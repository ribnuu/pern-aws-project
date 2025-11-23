const cccTrafficOffenseReportServices = require("../../services/ccc-traffic-offense-report/service");

const getLicenseInHandController = async (req, res) => {
  const reqBody = req.body; // Extract filters from the request body
  const user_id = req.headers.user_id;
  try {
    const data =
      await cccTrafficOffenseReportServices.getLicenseInHandService(reqBody);

    res.send({ success: true, data: data });
  } catch (error) {
    res.status(500).json({
      error: "Failed to get license in hand data",
    });
  }
};

module.exports = {
  getLicenseInHandController,
};
