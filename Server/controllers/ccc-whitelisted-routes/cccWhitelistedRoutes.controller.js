const cccWhitelistedRoutesServices = require("../../services/ccc-whitelisted-routes/service");

// Controller function to handle the request for retrieving transactions by date and other filters
const insertWhitelistedRouteRecordController = async (req, res) => {
  const reqBody = req.body; // Extract filters from the request body
  const createdBy = req.headers.user_id;
  try {
    // Call the service function to fetch data based on the filters and institution IDs
    const data =
      await cccWhitelistedRoutesServices.insertWhitelistedRouteRecordService(
        reqBody,
        createdBy
      );

    // Send the fetched data as a successful response
    res.send({ success: true, data: data });
  } catch (error) {
    // Handle any errors by sending a 500 status with an error message
    res.status(500).json({
      error: "Failed to insert",
    });
  }
};

const getAllWhitelistedRoutesController = async (req, res) => {
  try {
    const data =
      await cccWhitelistedRoutesServices.getAllWhitelistedRoutesService();

    res.send({ success: true, data: data });
  } catch (error) {
    // Handle any errors by sending a 500 status with an error message
    res.status(500).json({
      error: "Failed to get",
    });
  }
};

module.exports = {
  insertWhitelistedRouteRecordController,
  getAllWhitelistedRoutesController,
};
