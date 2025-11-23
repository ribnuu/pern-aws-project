const posRepresentativesServices = require("../../services/pos-representatives/service");

const createOrUpdateListOfRepresentativesInCustomerInstitutionController =
  async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const response =
        await posRepresentativesServices.createOrUpdateListOfRepresentativesInCustomerInstitutionService(
          id,
          data
        );
      res.send({ success: true });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Failed to fetch stock customer institution record" });
    }
  };

const getAllInstitutionRepresentativesByInstitutionIdController = async (
  req,
  res
) => {
  const { id } = req.params;
  try {
    const data =
      await posRepresentativesServices.getAllInstitutionRepresentativesByInstitutionIdService(
        id
      );
    res.send({ success: true, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error:
        "Failed to fetch stock customer representatives record by institution id",
    });
  }
};

const searchStockInstitutionRepresentativeController = async (req, res) => {
  const { searchTerm } = req.body;
  try {
    const data =
      await posRepresentativesServices.searchStockInstitutionRepresentativeService(
        { searchTerm }
      );
    res.send({ success: true, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to search stock institution representatives",
    });
  }
};

module.exports = {
  createOrUpdateListOfRepresentativesInCustomerInstitutionController,
  getAllInstitutionRepresentativesByInstitutionIdController,
  searchStockInstitutionRepresentativeController,
};
