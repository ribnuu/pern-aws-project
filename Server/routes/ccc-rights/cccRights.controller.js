const express = require("express");
const cccRightsController = require("../../controllers/ccc-rights/cccRights.controller");
const router = express.Router();

router.post(
  "/api/ccc-rights/generate-tree-view-data-by-group-or-role-id",
  cccRightsController.generateTreeViewForAllPagesByGroupOrRoleIdController
);

router.post(
  "/api/ccc-rights/update-tree-view-data",
  cccRightsController.updateTreeViewDataController
);

module.exports = router;
