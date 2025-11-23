const addressService = require("../../services/ccc-address/service");

const searchProvinceController = async (req, res) => {
  const searchTerm = req.query.searchTerm || ""; // Get search term from query parameters
  try {
    const provinces = await addressService.searchProvinceService(searchTerm);
    res.send({ success: true, data: provinces });
  } catch (error) {
    res.status(500).json({
      error: "Failed to search provinces",
    });
  }
};

const searchDistrictController = async (req, res) => {
  const searchTerm = req.query.searchTerm || ""; // Get search term from query parameters
  try {
    const districts = await addressService.searchDistrictService(searchTerm);
    res.send({ success: true, data: districts });
  } catch (error) {
    res.status(500).json({
      error: "Failed to search districts",
    });
  }
};

const searchCityController = async (req, res) => {
  const searchTerm = req.query.searchTerm || ""; // Get search term from query parameters
  try {
    const cities = await addressService.searchCityService(searchTerm);
    res.send({ success: true, data: cities });
  } catch (error) {
    res.status(500).json({
      error: "Failed to search cities",
    });
  }
};

module.exports = {
  searchProvinceController,
  searchDistrictController,
  searchCityController,
};
