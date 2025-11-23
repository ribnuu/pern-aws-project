const setUpAssociations = require("../../models/pos");
const posInstitutionStockActivityCheckQueries = require("./queries");

const getInstitutionStockActivityCheckDataService = async ({
  filters = {},
}) => {
  try {
    // Destructure filter values with default empty object
    const { loadInstitutionsBy } = filters;
    const institutions =
      await posInstitutionStockActivityCheckQueries.getInstitutionStockActivityCheckDataQuery(
        { loadInstitutionsBy }
      );
    return institutions;
  } catch (error) {
    // Handle or log the error as appropriate
    console.error(
      "Error fetching institution stock activity check data:",
      error
    );
    throw error;
  }
};

module.exports = {
  getInstitutionStockActivityCheckDataService,
};
