const userAffiliationQueries = require("./queries");

const getAffiliationsByGroupAndRoleIdService = async (groupId, roleId) => {
  try {
    const data =
      await userAffiliationQueries.getAffiliationsByGroupAndRoleIdQuery(
        groupId,
        roleId
      );
    return data;
  } catch (error) {
    console.error(
      "Error fetching affiliations by group and role id @ service",
      error
    );
    throw error;
  }
};

const addAffiliationsForUsersService = async (users, groupId, roleId) => {
  try {
    const data = await userAffiliationQueries.addAffiliationsForUsersQuery(
      users,
      groupId,
      roleId
    );
    return data;
  } catch (error) {
    console.error("Error adding affiliations @ service", error);
    throw error;
  }
};

const removeAffiliationsForUsersService = async (
  userAffiliationIdsToRemove
) => {
  try {
    const data = await userAffiliationQueries.removeAffilaitionsQuery(
      userAffiliationIdsToRemove
    );
    return data;
  } catch (error) {
    console.error("Error removing affiliations @ service", error);
    throw error;
  }
};

const getUserGroupDatabaseByGroupIdService = async (groupId) => {
  try {
    const userGroupDatabase =
      await userAffiliationQueries.getUserGroupDatabaseByGroupIdQuery(groupId);
    return userGroupDatabase;
  } catch (error) {
    console.error(
      "Error fetching user group database by group id service",
      error
    );
    throw error;
  }
};

module.exports = {
  getAffiliationsByGroupAndRoleIdService,
  addAffiliationsForUsersService,
  removeAffiliationsForUsersService,
  getUserGroupDatabaseByGroupIdService,
};
