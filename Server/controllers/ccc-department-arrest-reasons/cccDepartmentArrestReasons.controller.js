const cccDepartmentArrestReasonsServices = require("../../services/ccc-department-arrest-reasons/service");

const searchDepartmentArrestReasonsController = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm || ""; // Get search term from query parameters

    const data =
      await cccDepartmentArrestReasonsServices.searchDepartmentArrestReasonsService(
        searchTerm
      );
    res.send({ success: true, data });
  } catch (error) {
    res.status(500).json({
      error: "Failed to search deparmtnet arrest reasons",
    });
  }
};

module.exports = {
  searchDepartmentArrestReasonsController,
};
