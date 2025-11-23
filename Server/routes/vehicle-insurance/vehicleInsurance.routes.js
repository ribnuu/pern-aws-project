const express = require("express");
const vehicleInsuranceController = require("../../controllers/vehicle-insurance/vehicleInsurance.controller");
const router = express.Router();

router.post(
  "/api/vehicle-insurance/lolc/receiveByNic",
  vehicleInsuranceController.receiveLolcByNic
);

router.post(
  "/api/vehicle-insurance/peoples/receiveByNic",
  vehicleInsuranceController.receivePeoplesByNic
);

module.exports = router;
