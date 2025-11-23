const express = require("express");
const cccSearchController = require("../../controllers/ccc-search/cccSearch.controller");
const router = express.Router();

router.post(
  "/api/ccc-search/by-group-id-role-id-and-search-term",
  cccSearchController.searchUserByGroupIdRoleIdAndSearchTermController
);

module.exports = router;
