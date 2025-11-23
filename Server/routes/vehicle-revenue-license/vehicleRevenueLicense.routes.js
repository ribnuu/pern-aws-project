const express = require("express");
const vehicleRevenueLicenseController = require("../../controllers/vehicle-revenue-license/vehicleRevenueLicense.controller");
const router = express.Router();

router.post(
  "/api/vehicle-revenue-license/receiveByNic",
  vehicleRevenueLicenseController.receiveByNic
);

module.exports = router;
