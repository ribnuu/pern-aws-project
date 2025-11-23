const cccSearchServices = require("../../services/ccc-search/service");

const searchUserByGroupIdRoleIdAndSearchTermController = async (req, res) => {
  try {
    const reqBody = req.body;
    const data =
      await cccSearchServices.searchUserByGroupIdRoleIdAndSearchTermService(
        reqBody
      );
    res.send({ success: true, data });
  } catch (error) {
    res.status(500).json({
      error: "Failed to search user by group, role and search term",
    });
  }
};

module.exports = {
  searchUserByGroupIdRoleIdAndSearchTermController,
};
