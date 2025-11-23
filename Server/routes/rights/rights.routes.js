const express = require("express");
const rightsController = require("../../controllers/rights/rights.controller");
const router = express.Router();

//
router.post("/api/rights/assignUserRights", rightsController.assignUserRights);

// ----------------------------- Rights By Group Id -------------------------------------
router.post(
  "/api/rights/assignGroupRights",
  rightsController.assignGroupRights
);
router.get(
  "/api/rights/groups/:groupId",
  rightsController.getUserButtonRightsByGroupId
);

// ----------------------------- Rights By Roles ----------------------------------------
router.post("/api/rights/assignRoleRights", rightsController.assignRoleRights);
router.get(
  "/api/rights/roles/:roleId",
  rightsController.getUserButtonRightsByRoleId
);

// -----------------------------Get user rights by user_id----------------------------------
router.post(
  "/api/rights/getUserRightsByUserId",
  rightsController.getUserPagesRightsByUserIdAndComponentId
);

router.post(
  "/api/rights/getUserButtonsRightsByUserIdAndByComponentsId",
  rightsController.getUserButtonsRightsByUserIdAndByComponentsId
);

//-------------------------- Get User Rights By User Id For Assign Rights --------------------------
router.post(
  "/api/rights/getUserButtonsRightsByUserId",
  rightsController.getUserButtonsRightsByUserId
);

//---------------------------------- Revoke Rights By User Id ----------------------------------

router.post(
  "/api/rights/revoke/revokeUserButtonsRightsByUserId",
  rightsController.revokeUserButtonsRightsByUserId
);

// Load buttons pages and more
router.post(
  "/api/rights/get-landing-page-buttons-by-user-id",
  rightsController.getAllLandingPageButtonsByUserIdController
);

router.post(
  "/api/rights/get-buttons-by-user-and-page-id",
  rightsController.getButtonsByUserAndPageIdController
);

router.post(
  "/api/rights/get-buttons-by-user-and-button-id",
  rightsController.getButtonsByButtonIdAndUserIdController
);

module.exports = router;



