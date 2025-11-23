const express = require("express");
const offensesController = require("../../controllers/department-drivers-offense-portal/departmentDriversOffensePortal.controller");

const router = express.Router();

// Route to create an offense record
router.post(
  "/api/departmentDriversOffensePortal",
  offensesController.createOffenseRecord
);

// Route to update the offense mobile number by offense id
router.put(
  "/api/departmentDriversOffensePortal/mobileNumber/:id",
  offensesController.updateMobileNumberByIdController
);

// Route to get offenses by driver's license number
router.get(
  "/api/departmentDriversOffensePortal/:licenseNumber",
  offensesController.getOffensesByDriverLicenseNumber
);

// Route to get offense by reference number
router.get(
  "/api/departmentDriversOffensePortal/offenseByRefNo/:referenceNumber",
  offensesController.getOffenseByReferenceNumber
);

// Route to get fines on duty by police officer ID
router.post(
  "/api/departmentDriversOffensePortal/finesOnMyDuty/:policeOfficerId",
  offensesController.getFinesOnMyDutyByPoliceOfficerIdController
);

// Router to get the offenses of the current user by his mobile number
router.get(
  "/api/department-driver-offense-portal/offense-by-user",
  offensesController.getFinesOnMeByMobileNumberController
);

// Router to get the fines that are paid and fines put on my mobile_number
router.get(
  "/api/department-driver-offense-portal/piad-offense-by-user",
  offensesController.getPaidFinesOnMeByMobileNumberController
);

module.exports = router;
