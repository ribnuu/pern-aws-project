const setUpAssociationsCCC = require("../../models/ccc");

const createDepartmentSearchHistoryQuery = async ({
  officerId,
  searchCriteria,
  resultCount,
  latitude,
  longitude,
  searchDateTime,
  remarks,
}) => {
  try {
    const { DepartmentSearchHistory } = setUpAssociationsCCC();

    // Create a new record in the DepartmentSearchHistory table
    const record = await DepartmentSearchHistory.create(
      {
        officer_id: officerId,
        search_criteria: searchCriteria,
        result_count: resultCount,
        latitude: latitude,
        longitude: longitude,
        search_date_time: searchDateTime || new Date(), // Default to current time if not provided
        remarks: remarks,
      },
      { returning: true }
    );

    return record;
  } catch (error) {
    console.error("Error creating DepartmentSearchHistory record:", error);
    throw error;
  }
};

module.exports = {
  createDepartmentSearchHistoryQuery,
};
