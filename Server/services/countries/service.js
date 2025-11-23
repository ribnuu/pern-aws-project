const countriesQueries = require("./queries");

const searchCountriesService = async () => {
  try {
    const response = await countriesQueries.searchCountriesQuery();
    return response;
  } catch (error) {
    console.error("Error in service:", error);
    throw error;
  }
};

module.exports = {
  searchCountriesService,
};
