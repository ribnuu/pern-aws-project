const posStockCustomerInstitutionQueries = require("./queries");

const searchStockCustomerPersonService = async (id) => {
  try {
    const data =
      await posStockCustomerInstitutionQueries.searchStockCustomerPersonQuery(
        id
      );
    return data;
  } catch (error) {
    console.log(error); // Log the error for debugging purposes
    throw error;
  }
};

const fetchStockCustomerPersonByMobileNumberService = async (mobileNumber) => {
  try {
    const data =
      await posStockCustomerInstitutionQueries.fetchStockCustomerPersonByMobileNumberQuery(
        mobileNumber
      );
    return data;
  } catch (error) {
    throw error;
  }
};

const addCCCUserIdToStockCustomerPersonService = async ({
  userGroupDbName,
  cccUserIdsList, // List of user IDs
  isDeleted,
}) => {
  try {
    const results = [];
    if (userGroupDbName) {
      // Iterate over the list of user IDs and process each one
      for (const cccUserId of cccUserIdsList) {
        const data =
          await posStockCustomerInstitutionQueries.addCCCUserIdToStockCustomerPersonQuery(
            userGroupDbName,
            cccUserId,
            isDeleted
          );
        results.push(data); // Collect the result for each user ID
      }
    }
    return results; // Return all results
  } catch (error) {
    console.error("Error in addCCCUserIdToStockCustomerPersonService:", error);
    throw error;
  }
};

const insertStockCustomerPersonService = async (toCreateCustomerPersonData) => {
  try {
    const data =
      await posStockCustomerInstitutionQueries.insertStockCustomerPersonQuery(
        toCreateCustomerPersonData
      );
    return data;
  } catch (error) {
    console.error("Error in insert stock customer person service");

    throw error;
  }
};

module.exports = {
  searchStockCustomerPersonService,
  fetchStockCustomerPersonByMobileNumberService,
  addCCCUserIdToStockCustomerPersonService,
  insertStockCustomerPersonService,
};
