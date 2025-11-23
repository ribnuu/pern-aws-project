const express = require("express");
const rolesController = require("../../controllers/roles/roles.controller");
const router = express.Router();

router.get("/api/roles", rolesController.getAllRolesController);
router.get(
  "/api/roles/byGroupId/:groupId",
  rolesController.getAllRolesByGroupId
);

module.exports = router;
