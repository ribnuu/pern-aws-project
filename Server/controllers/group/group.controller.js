const groupService = require("../../services/group/groupService");

const getAllGroupsController = async (req, res) => {
  try {
    const data = await groupService.getAllGroupsService();
    res.send({ success: true, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to get all groups @ controller" });
  }
};

module.exports = {
  getAllGroupsController,
};
