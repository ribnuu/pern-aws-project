const defineCountries = require("../../models/ccc/Countries");
const client = require("../../config/db");

const searchCountriesQuery = async () => {
  try {
    // const countries = await defineCountries.findAll({
    //   attributes: ["country_name", "nationality"],
    // });
    // return countries;
    const query = `SELECT country_name AS label , nationality AS value FROM countries`;
    const res = await client.query(query);
    return res;
  } catch (error) {
    console.error("Error searching countries:", error);
    throw error;
  }
};

module.exports = {
  searchCountriesQuery,
};
