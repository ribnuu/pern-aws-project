const cccRightsService = require("../../services/ccc-rights/service");

const generateTreeViewForAllPagesByGroupOrRoleIdController = async (
  req,
  res
) => {
  try {
    const reqBody = req.body;
    const data =
      await cccRightsService.generateTreeViewForAllPagesByGroupOrRoleIdService(
        reqBody
      );
    res.send({ success: true, data });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch tree view data",
    });
  }
};

const updateTreeViewDataController = async (req, res) => {
  try {
    const reqBody = req.body;
    const data = await cccRightsService.updateTreeViewDataService(reqBody);
    res.send({ success: true, data });
  } catch (error) {
    res.status(500).json({
      error: "Failed to update tree view data",
    });
  }
};

module.exports = {
  generateTreeViewForAllPagesByGroupOrRoleIdController,
  updateTreeViewDataController,
};
