const rolesService = require("../../services/roles/rolesService");

const getAllRolesController = async (req, res) => {
  try {
    const data = await rolesService.getAllRolesService();
    res.send({ success: true, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get all roles @ controller" });
  }
};

const getAllRolesByGroupId = async (req, res) => {
  const { groupId } = req.params;
  try {
    const data = await rolesService.getAllRolesByGroupIdService(groupId);
    res.send({ success: true, data });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Failed to get all roles by group id @ controller" });
  }
};

module.exports = {
  getAllRolesController,
  getAllRolesByGroupId,
};
