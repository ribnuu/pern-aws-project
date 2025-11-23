const cccDepartmentArrestReasonsQueries = require("./queries");

const searchDepartmentArrestReasonsService = async (search_query) => {
  try {
    const data =
      await cccDepartmentArrestReasonsQueries.searchDepartmentArrestReasonsQuery(
        {
          search_query,
        }
      );
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  searchDepartmentArrestReasonsService,
};
