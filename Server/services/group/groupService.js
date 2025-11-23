const groupQueries = require("./groupQueries");

const getAllGroupsService = async () => {
  try {
    const groups = await groupQueries.getAllGroupsQuery();
    return groups;
  } catch (error) {
    console.error("Error fetching group @ service:", error);
    throw error;
  }
};

module.exports = {
  getAllGroupsService,
};
