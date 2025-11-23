const express = require("express");
const cccPoliceDivisionMasterMasterController = require("../../controllers/ccc-police-division-master/cccPoliceDivisionMaster.controller");
const router = express.Router();

// Create CCC Department Drivers License Dispatches
router.get(
  "/api/ccc/police-division-master/search",
  cccPoliceDivisionMasterMasterController.searchPoliceDivisionController
);

module.exports = router;
