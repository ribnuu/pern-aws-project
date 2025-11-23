const express = require("express");
const vehicleEmissionController = require("../../controllers/vehicle-emission-certificate/vehicleEmissionCertificate.controller");
const router = express.Router();

router.post(
  "/api/vehicle-emission/receiveByNic",
  vehicleEmissionController.receiveByNic
);

module.exports = router;
