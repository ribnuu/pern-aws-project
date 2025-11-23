const cccWhitelistedRoutesQueries = require("./queries");

const insertWhitelistedRouteRecordService = async (data, createdBy) => {
  try {
    const { route, method, description, has_path_parameters } = data;

    const response =
      await cccWhitelistedRoutesQueries.insertWhitelistedRouteRecordQuery({
        route,
        method,
        description,
        has_path_parameters,
        created_by: createdBy,
      });

    return response;
  } catch (error) {
    throw error;
  }
};

const getAllWhitelistedRoutesService = async () => {
  try {
    const response =
      await cccWhitelistedRoutesQueries.getAllWhitelistedRoutesQuery();

    return response;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  insertWhitelistedRouteRecordService,
  getAllWhitelistedRoutesService,
};
