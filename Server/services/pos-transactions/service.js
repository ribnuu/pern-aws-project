const posTransactionsQueries = require("./queries");

// Service function to retrieve all transactions based on date and other filters
const getAllTransactionsByDateAndOtherFiltersService = async ({
  filters, // Object containing the filters for the query
  institutionIds, // List of institution IDs to filter by
}) => {
  try {
    // Destructure the relevant filters from the filters object
    const {
      filterDateIn,
      loadBillsBy,
      fromDate,
      toDate,
      institutionId,
      representativeId,
    } = filters;

    // If an institutionId is provided in the filters, override the institutionIds list with it
    if (institutionId) {
      institutionIds = [institutionId];
    }

    // Fetch the data using the query function, passing in the filters and institution IDs
    const data =
      await posTransactionsQueries.getAllTransactionsByDateAndOtherFiltersQuery(
        {
          filterDateIn,
          loadBillsBy,
          fromDate,
          toDate,
          institutionIds,
          representativeId,
        }
      );

    // Return the retrieved data
    return data;
  } catch (error) {
    // Catch and re-throw any errors encountered during the process
    throw error;
  }
};

const getAllPaidBillsInTheCompanyService = async ({
  filters, // Object containing the filters for the query
  institutionIds, // List of institution IDs to filter by
  stockCustomerPersonId,
}) => {
  try {
    // Destructure the relevant filters from the filters object
    const { fromDate, toDate, institutionId, representativeId } = filters;

    // If an institutionId is provided in the filters, override the institutionIds list with it
    if (institutionId) {
      institutionIds = [institutionId];
    }

    // Fetch the data using the query function, passing in the filters and institution IDs
    const data = await posTransactionsQueries.getAllPaidBillsInTheCompanyQuery({
      fromDate,
      toDate,
      institutionIds,
      representativeId,
      stockCustomerPersonId,
    });

    // Return the retrieved data
    return data;
  } catch (error) {
    // Catch and re-throw any errors encountered during the process
    throw error;
  }
};

const createRepsPaidComissionItemWiseService = async ({
  bill,
  billDetail,
  currentLoggedInUserIdInPOSDB,
}) => {
  try {
    const newRecord =
      await posTransactionsQueries.createRepsPaidComissionItemWiseQuery({
        bill,
        billDetail,
        currentLoggedInUserIdInPOSDB,
      });
  } catch (error) {
    throw error;
  }
};

const getAllBillingInformationAndRepsStockDispatchDataByFiltersService =
  async ({ fromDate, toDate, institutionIds, stockCustomerPersonId }) => {
    try {
      const data =
        await posTransactionsQueries.getAllBillingInformationAndRepsStockDispatchDataByFiltersQuery(
          {
            fromDate,
            toDate,
            institutionIds,
            stockCustomerPersonId,
          }
        );
      return data;
    } catch (error) {
      throw error;
    }
  };

const getAllPaymentsReceivedByFiltersService = async (
  filters,
  institutionIds
) => {
  try {
    const {
      filterDateIn,
      loadBillsBy,
      fromDate,
      toDate,
      institutionId,
      representativeId,
    } = filters;

    // If an institutionId is provided in the filters, override the institutionIds list with it
    if (institutionId) {
      institutionIds = [institutionId];
    }
    const data =
      await posTransactionsQueries.getAllPaymentsReceivedByFiltersQuery({
        filterDateIn,
        loadBillsBy,
        fromDate,
        toDate,
        institutionIds,
        representativeId,
      });

    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllTransactionsByDateAndOtherFiltersService,
  getAllPaidBillsInTheCompanyService,
  createRepsPaidComissionItemWiseService,
  getAllBillingInformationAndRepsStockDispatchDataByFiltersService,
  getAllPaymentsReceivedByFiltersService,
};
