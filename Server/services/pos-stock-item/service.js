const posStockItemQueries = require("./queries");

const searchStockItemHeadersInTheCompanyService = async (searchTerm) => {
  try {
    const results =
      await posStockItemQueries.searchStockItemHeadersInTheCompanyQuery(
        searchTerm
      );

    return results;
  } catch (error) {
    throw error;
  }
};

module.exports = { searchStockItemHeadersInTheCompanyService };
