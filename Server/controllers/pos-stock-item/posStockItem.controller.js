const posStockItemServices = require("../../services/pos-stock-item/service");

// Controller function to handle the request for retrieving transactions by date and other filters
const searchStockItemHeadersInTheCompanyController = async (req, res) => {
  const { searchTerm } = req.body; // Extract filters from the request body

  try {
    // Call the service function to fetch data based on the filters and institution IDs
    const data =
      await posStockItemServices.searchStockItemHeadersInTheCompanyService(
        searchTerm
      );

    // Send the fetched data as a successful response
    res.send({ success: true, data: data });
  } catch (error) {
    // Handle any errors by sending a 500 status with an error message
    res.status(500).json({
      error: "Failed to search stock item headers in the company",
    });
  }
};

module.exports = {
  searchStockItemHeadersInTheCompanyController,
};
