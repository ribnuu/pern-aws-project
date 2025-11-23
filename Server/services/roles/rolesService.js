const rolesQueries = require("./rolesQueries");

const getAllRolesService = async () => {
  try {
    const roles = await rolesQueries.getAllRolesQuery();
    return roles;
  } catch (error) {
    console.error("Error fetching roles @ service:", error);
    throw error;
  }
};

const getAllRolesByGroupIdService = async (groupId) => {
  try {
    const roles = await rolesQueries.getRolesByGroupIdQuery(groupId);
    return roles;
  } catch (error) {
    console.error("Error fetching roles by group id @ service:", error);
    throw error;
  }
};

module.exports = {
  getAllRolesService,
  getAllRolesByGroupIdService,
};
