const cccPoliceDivisionMasterService = require("../../services/ccc-police-division-master/service");

const searchPoliceDivisionController = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm || ""; // Get search term from query parameters
    const data =
      await cccPoliceDivisionMasterService.searchPoliceDivisionService(
        searchTerm
      );
    res.send({ success: true, data });
  } catch (error) {
    res.status(500).json({
      error: "Failed to search police division",
    });
  }
};

module.exports = {
  searchPoliceDivisionController,
};
