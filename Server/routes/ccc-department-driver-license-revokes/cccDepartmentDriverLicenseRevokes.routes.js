const express = require("express");
const cccDepartmentDriverLicenseRevokesController = require("../../controllers/ccc-department-driver-license-revokes/cccDepartmentDriverLicenseRevokes.controller");
const router = express.Router();

router.post(
  "/api/department-driver-license-revokes",
  cccDepartmentDriverLicenseRevokesController.createRevokeLicenseRecordController
);

router.get(
  "/api/department-driver-license-revokes/:licenseNumber",
  cccDepartmentDriverLicenseRevokesController.getDepartmentDriverLicenseRevokesByLicenseNumberController
);

router.get(
  "/api/department-driver-license-revokes/revoke-status/:licenseNumber",
  cccDepartmentDriverLicenseRevokesController.getLicenseRevokeStatusController
);

module.exports = router;
