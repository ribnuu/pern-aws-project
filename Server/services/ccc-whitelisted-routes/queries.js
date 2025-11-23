const setUpAssociationsCCC = require("../../models/ccc");

const insertWhitelistedRouteRecordQuery = async ({
  route,
  method,
  description,
  has_path_parameters,
  created_by,
}) => {
  try {
    // Get the CccWhitelistedRoutes model
    const { CccWhitelistedRoutes } = setUpAssociationsCCC();

    // Insert a new record into the CccWhitelistedRoutes table
    const newRoute = await CccWhitelistedRoutes.create({
      route,
      method,
      description,
      has_path_parameters,
      created_by,
    });

    return newRoute;
  } catch (error) {
    // Handle errors
    console.error("Error inserting whitelisted route record:", error);
    throw error;
  }
};

/**
 * Function to get all whitelisted route records from the CccWhitelistedRoutes table.
 * @returns {Promise<Array>} - An array of all the records.
 */
const getAllWhitelistedRoutesQuery = async () => {
  try {
    // Get the CccWhitelistedRoutes model
    const { CccWhitelistedRoutes } = setUpAssociationsCCC();

    // Fetch all records from the CccWhitelistedRoutes table
    const allRoutes = await CccWhitelistedRoutes.findAll();

    return allRoutes;
  } catch (error) {
    // Handle errors
    console.error("Error fetching whitelisted route records:", error);
    throw error;
  }
};

module.exports = {
  insertWhitelistedRouteRecordQuery,
  getAllWhitelistedRoutesQuery,
};
