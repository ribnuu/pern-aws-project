const posRepresentativesQueries = require("./queries");

const createOrUpdateListOfRepresentativesInCustomerInstitutionService = async (
  id,
  data
) => {
  try {
    const response =
      await posRepresentativesQueries.createOrUpdateListOfRepresentativesInCustomerInstitutionQuery(
        id,
        data
      );
    return response;
  } catch (error) {
    console.log(error); // Log the error for debugging purposes
    throw error;
  }
};

const getAllInstitutionRepresentativesByInstitutionIdService = async (id) => {
  try {
    const data =
      await posRepresentativesQueries.getAllInstitutionRepresentativesByInstitutionIdQuery(
        id
      );
    return data;
  } catch (error) {
    console.log(error); // Log the error for debugging purposes
    throw error;
  }
};

const searchStockInstitutionRepresentativeService = async ({ searchTerm }) => {
  try {
    const data =
      posRepresentativesQueries.searchStockInstitutionRepresentativeQuery({
        searchTerm,
      });

    return data;
  } catch (error) {
    console.log(error);
    throw errror;
  }
};

module.exports = {
  createOrUpdateListOfRepresentativesInCustomerInstitutionService,
  getAllInstitutionRepresentativesByInstitutionIdService,
  searchStockInstitutionRepresentativeService,
};
