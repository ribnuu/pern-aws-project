const express = require("express");
const cccDepartmentDriversLicenseDispatchesController = require("../../controllers/ccc-department-drivers-license-dispatches/cccDepartmentDriversLicenseDispatches.controller");
const router = express.Router();

// Create CCC Department Drivers License Dispatches
router.post(
  "/api/ccc-department-drivers-license-dispatches",
  cccDepartmentDriversLicenseDispatchesController.createDepartmentDriverLicenseDispatchRecordController
);

module.exports = router;
