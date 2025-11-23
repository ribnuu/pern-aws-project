const userAffiliationsService = require("../../services/user-affiliations/service");
const posStockCustomerPersonService = require("../../services/pos-stock-customer-person/service");

const getAllUserAffiliationsByGroupAndRoleIdController = async (req, res) => {
  const { groupId, roleId } = req.params;
  try {
    const data =
      await userAffiliationsService.getAffiliationsByGroupAndRoleIdService(
        groupId,
        roleId
      );
    res.send({ success: true, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error:
        "Failed to get all user affiliations by group and role id @ controller",
    });
  }
};

const addAffiliationsForUsersController = async (req, res) => {
  const { users, groupId, roleId, userAffiliationIdsToRemove } = req.body;
  try {
    // Step 1
    const userGroupDatabase =
      await userAffiliationsService.getUserGroupDatabaseByGroupIdService(
        groupId
      );

    await posStockCustomerPersonService.addCCCUserIdToStockCustomerPersonService(
      {
        userGroupDbName: userGroupDatabase,
        cccUserIdsList: users,
        isDeleted: false,
      }
    );

    const removed =
      await userAffiliationsService.removeAffiliationsForUsersService(
        userAffiliationIdsToRemove
      );
    const data = await userAffiliationsService.addAffiliationsForUsersService(
      users,
      groupId,
      roleId
    );
    res.send({ success: true, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to add affilaitions fo users @ controller",
    });
  }
};

module.exports = {
  getAllUserAffiliationsByGroupAndRoleIdController,
  addAffiliationsForUsersController,
};
