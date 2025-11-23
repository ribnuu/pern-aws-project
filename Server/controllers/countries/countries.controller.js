const countriesService = require("../../services/countries/service");

const getCountriesController = async (req, res) => {
  try {
    const countries = await countriesService.searchCountriesService();
    res.status(200).send({ success: true, data: countries.rows });
  } catch (error) {
    console.error("Error in controller:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get countries",
    });
  }
};

module.exports = {
  getCountriesController,
};
