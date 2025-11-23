const departmentSearchHistoryQueries = require("./queries");

const createDepartmentSearchHistoryService = async ({
  reqBody = {},
  user_id,
}) => {
  try {
    // Ensure `user_id` is provided
    if (!user_id) {
      throw new Error("User ID is required to create a search history record.");
    }

    const {
      searchCriteria,
      resultCount,
      latitude,
      longitude,
      searchDateTime,
      remarks,
    } = reqBody;

    // Call the query to create a department search history record
    const data =
      await departmentSearchHistoryQueries.createDepartmentSearchHistoryQuery({
        officerId: user_id,
        searchCriteria,
        resultCount,
        latitude,
        longitude,
        searchDateTime,
        remarks,
      });

    return data;
  } catch (error) {
    console.error("Error creating department search history record:", error);

    // Provide a custom error message and retain the original error for debugging
    throw new Error(
      "Failed to create department search history record. Please try again."
    );
  }
};

module.exports = {
  createDepartmentSearchHistoryService,
};
