const posBillManagementQueries = require("./queries");

const getAllBillsInTheCompanyByFiltersService = async ({
  filters = {},
  requestBody = {},
}) => {
  try {
    let institutionIds = [];
    const { page, pageSize } = requestBody;

    // Destructure the relevant filters from the filters object
    const {
      fromDate = null,
      toDate = null,
      institutionId = null,
      representativeId = null,
      paidStatus = "ALL",
      deletedStatus = "ALL",
      loadCustomerBills,
    } = filters;

    // If an institutionId is provided in the filters, override the institutionIds list with it
    if (institutionId) {
      institutionIds = [institutionId];
    }

    // Fetch the data using the query function, passing in the filters and institution IDs
    const data =
      await posBillManagementQueries.getAllBillsInTheCompanyByFiltersQuery({
        page,
        pageSize,
        fromDate,
        toDate,
        institutionIds,
        representativeId,
        paidStatus,
        deletedStatus,
        loadCustomerBills,
      });

    // Return the retrieved data
    return data;
  } catch (error) {
    // Catch and re-throw any errors encountered during the process
    throw error;
  }
};

const markBillAsDeletedByBillNumberService = async (billNumber) => {
  try {
    const data =
      await posBillManagementQueries.markBillAsDeletedByBillNumberQuery(
        billNumber
      );
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllBillsInTheCompanyByFiltersService,
  markBillAsDeletedByBillNumberService,
};
