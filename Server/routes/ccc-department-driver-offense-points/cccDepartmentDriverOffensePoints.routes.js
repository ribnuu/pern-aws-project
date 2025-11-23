const express = require("express");
const cccDepartmentDriverOffensePointsController = require("../../controllers/ccc-department-driver-offense-points/cccDepartmentDriverOffensePoints.controller");
const router = express.Router();

// Create CCC Department Drivers License Dispatches
router.get(
  "/api/ccc/department-driver-offense-points/:licenseNumber",
  cccDepartmentDriverOffensePointsController.getDepartmentDriverOffensePointsByLicenseNumberController
);

module.exports = router;
