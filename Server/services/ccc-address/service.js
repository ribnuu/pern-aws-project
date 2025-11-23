const addressQueries = require("./queries");

const searchProvinceService = async (searchTerm) => {
  try {
    const provinces = await addressQueries.searchProvinceQuery(searchTerm);
    return provinces;
  } catch (error) {
    throw error;
  }
};

const searchDistrictService = async (searchTerm) => {
  try {
    const districts = await addressQueries.searchDistrictQuery(searchTerm);
    return districts;
  } catch (error) {
    throw error;
  }
};

const searchCityService = async (searchTerm) => {
  try {
    const cities = await addressQueries.searchCityQuery(searchTerm);
    return cities;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  searchProvinceService,
  searchDistrictService,
  searchCityService,
};
