const express = require("express");
const immigrationController = require("../../controllers/immigration/immigration.controller");
const router = express.Router();

router.post(
  "/api/airport/receiveByNic",
  immigrationController.receiveAirportTravelHistoryByNic
);
router.post(
  "/api/port/receiveByNic",
  immigrationController.receivePortTravelHistoryByNic
);

module.exports = router;
