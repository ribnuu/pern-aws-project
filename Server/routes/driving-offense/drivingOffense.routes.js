const express = require("express");
const drivingOffenseController = require("../../controllers/driving-offense/drivingOffense.controller");
const router = express.Router();

router.post(
  "/api/driving-offense/receiveByNic",
  drivingOffenseController.receiveByNic
);

router.post(
  "/api/driving-points/receiveByNic",
  drivingOffenseController.receivePointsByNic
);

module.exports = router;
