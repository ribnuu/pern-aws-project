const express = require("express");
const userAffiliationsController = require("../../controllers/user-affiliations/userAffiliations.controller");
const router = express.Router();

router.get(
  "/api/user-affiliations/:groupId/:roleId",
  userAffiliationsController.getAllUserAffiliationsByGroupAndRoleIdController
);

router.post(
  "/api/user-affiliations",
  userAffiliationsController.addAffiliationsForUsersController
);

module.exports = router;
