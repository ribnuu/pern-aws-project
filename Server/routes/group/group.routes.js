const express = require("express");
const groupController = require("../../controllers/group/group.controller");
const router = express.Router();

router.get("/api/groups", groupController.getAllGroupsController);

module.exports = router;
