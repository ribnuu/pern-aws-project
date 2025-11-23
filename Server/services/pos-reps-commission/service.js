const posRepsCommissionsQueries = require("./queries");

const getAllRepsCommissionPayService = async ({ reqQuery }) => {
  try {
    const {
      fromDate,
      toDate,
      representativeStockCustomerPersonId,
      institutionId,
      loadCustomerBills,
    } = reqQuery;
    const response =
      await posRepsCommissionsQueries.getAllRepsCommissionPayQuery({
        fromDate,
        toDate,
        representativeStockCustomerPersonId,
        institutionId,
        loadCustomerBills,
      });
    return response;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllRepsCommissionPayService,
};
