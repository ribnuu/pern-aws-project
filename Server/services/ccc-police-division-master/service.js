const cccPoliceDivisionMasterQueries = require("./queries");

const searchPoliceDivisionService = async (searchTerm) => {
  try {
    const response =
      await cccPoliceDivisionMasterQueries.searchPoliceDivisionQuery(
        searchTerm
      );
    return response;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  searchPoliceDivisionService,
};
