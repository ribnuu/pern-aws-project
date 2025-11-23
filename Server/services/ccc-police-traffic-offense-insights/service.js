const cccPoliceTrafficOffenseInsightsQueries = require("./queries");

const getLicenseInHandByFiltersService = async (filters = {}) => {
  try {
    const { fromDate, toDate, filterBy, dispatchedStatus, dataFor, officerId } =
      filters;

    const response =
      await cccPoliceTrafficOffenseInsightsQueries.getLicenseInHandByFiltersQuery(
        {
          fromDate: fromDate,
          toDate: toDate,
          filterBy: filterBy,
          dispatchedStatus: dispatchedStatus,
          dataFor: dataFor,
          officerId: officerId,
        }
      );
    return response;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getLicenseInHandByFiltersService,
};
