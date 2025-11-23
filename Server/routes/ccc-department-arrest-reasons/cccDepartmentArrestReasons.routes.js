const express = require("express");
const cccDepartmentArrestReasonsController = require("../../controllers/ccc-department-arrest-reasons/cccDepartmentArrestReasons.controller");
const router = express.Router();

router.get(
  "/api/ccc/ccc-department-arrest-reasons/search",
  cccDepartmentArrestReasonsController.searchDepartmentArrestReasonsController
);

module.exports = router;
