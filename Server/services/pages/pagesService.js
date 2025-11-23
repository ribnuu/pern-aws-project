const pagesQueries = require("./pagesQueries");

const getPagesByGroupIdService = async (groupId) => {
  try {
    const data = await pagesQueries.getPagesByGroupIdQuery(groupId);
    return data;
  } catch (error) {
    console.error("Error fetching pages by group id @ service", error);
    throw error;
  }
};

module.exports = {
  getPagesByGroupIdService,
};
