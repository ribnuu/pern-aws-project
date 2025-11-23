const cccSearchQueries = require("./queries");

const searchUserByGroupIdRoleIdAndSearchTermService = async (reqBody) => {
  try {
    const { groupId, roleId, searchTerm } = reqBody;
    const data =
      await cccSearchQueries.searchUserByGroupIdRoleIdAndSearchTermQuery(
        groupId,
        roleId,
        searchTerm
      );
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  searchUserByGroupIdRoleIdAndSearchTermService,
};
