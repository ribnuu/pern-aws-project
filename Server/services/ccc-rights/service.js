const cccRightsQueries = require("./queries");

const generateTreeViewForAllPagesByGroupOrRoleIdService = async (reqBody) => {
  try {
    const { groupId, roleId } = reqBody;
    const data =
      await cccRightsQueries.generateTreeViewForAllPagesByGroupOrRoleIdQuery({
        groupId: groupId,
        roleId: roleId,
      });
    return data;
  } catch (error) {
    throw error;
  }
};

const updateTreeViewDataService = async (reqBody) => {
  try {
    const { data, groupId, roleId } = reqBody;
    if (groupId) {
      const response = await cccRightsQueries.updateTreeViewDataForGroupQuery({
        groupId: groupId,
        data: data,
      });
      return response;
    }

    if (roleId) {
      const response = await cccRightsQueries.updateTreeViewDataForRoleQuery({
        roleId: roleId,
        data: data,
      });
      return response;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  generateTreeViewForAllPagesByGroupOrRoleIdService,
  updateTreeViewDataService,
};
