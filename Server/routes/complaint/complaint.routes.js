const express = require("express");
const complaintController = require("../../controllers/complaint/complaint.controller");
const router = express.Router();

// Missing Vehicle
router.post(
  "/api/complaint/missingVehicle",
  complaintController.createMissingVehicle
);
router.post(
  "/api/complaint/receiveMissingVehicleByNic",
  complaintController.receiveMissingVehicleByNic
);

// My Devices
router.post(
  "/api/complaint/receiveMyDevicesByNic",
  complaintController.receiveMyDevicesByNic
);

//Missing License
router.post(
  "/api/complaint/missingLicense",
  complaintController.createMissingLicense
);
router.post(
  "/api/complaint/receiveMissingLicenseByNic",
  complaintController.receiveMissingLicenseByNic
);
router.post(
  "/api/complaint/receiveMissingLicenseComplaintByNicNumber",
  complaintController.receiveMissingLicenseComplaintByNicNumber
);

// Missing Passport
router.post(
  "/api/complaint/missingPassport",
  complaintController.createMissingPassport
);
router.post(
  "/api/complaint/receiveMissingPassportByNic",
  complaintController.receiveMissingPassportByNic
);

router.post(
  "/api/complaint/receiveMissingPassportComplaintByNicNumber",
  complaintController.receiveMissingPassportComplaintByNicNumber
);

// Missing Nic
router.post(
  "/api/complaint/missingNic",
  complaintController.createComplaintMissingNic
);
router.post(
  "/api/complaint/receiveMissingNicByNic",
  complaintController.receiveMissingNicByNic
);

// Assault
router.post(
  "/api/complaint/assault",
  complaintController.createComplaintAssault
);

router.post(
  "/api/complaint/receiveAssaultByNic",
  complaintController.receiveAssaultByNic
);

router.post(
  "/api/complaint/receiveAssaulterByNic",
  complaintController.receiveAssaulterByNic
);

//Missing Pets
router.post(
  "/api/complaint/receiveMissingPetsByNic",
  complaintController.receiveMissingPetsByNic
);

// Retrieve All Records of complaints
// For CGP

router.post(
  "/api/complaint/receiveMissingVehicle",
  complaintController.receiveMissingVehicle
);
router.post(
  "/api/complaint/receiveMissingPerson",
  complaintController.receiveMissingPerson
);

router.post(
  "/api/complaint/MissingPerson",
  complaintController.createMissingPerson
);

// Retrieve Missing Person based on district id
router.post(
  "/api/complaint/receiveMissingPersonByDistrictId",
  complaintController.receiveMissingPersonByDistrictId
);

router.post(
  "/api/complaint/receiveMissingPets",
  complaintController.receiveMissingPets
);

router.post(
  "/api/complaint/receiveWantedPerson",
  complaintController.receiveWantedPerson
);

router.post(
  "/api/complaint/receiveWantedPersonByDistrictId",
  complaintController.receiveWantedPersonByDistrictId
);

// Retrieve Last Record for complaint number increment
router.post(
  "/api/complaint/retrieveLastMissingPassportRecord",
  complaintController.retrieveLastMissingPassportRecord
);

router.post(
  "/api/complaint/retrieveLastMissingLicenseRecord",
  complaintController.retrieveLastMissingLicenseRecord
);

router.post(
  "/api/complaint/retrieveLastAssaultRecord",
  complaintController.retrieveLastAssaultRecord
);

router.post(
  "/api/complaint/retrieveLastMyDevicesRecord",
  complaintController.retrieveLastMyDevicesRecord
);

router.post(
  "/api/complaint/retrieveLastMissingNicRecord",
  complaintController.retrieveLastMissingNicRecord
);

router.post(
  "/api/complaint/retrieveLastMissingVehicleRecord",
  complaintController.retrieveLastMissingVehicleRecord
);
router.post(
  "/api/complaint/retrieveLastMissingPersonRecord",
  complaintController.retrieveLastMissingPersonRecord
);

router.get("/check", (req, res) => {
  console.log("Hello world");
  res.send({ msg: "Hello" });
  // Other logic or response handling can be added here
});

module.exports = router;
