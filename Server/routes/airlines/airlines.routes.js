const express = require("express");
const airlinesController = require("../../controllers/airport/airport.controller");
const router = express.Router();

router.post(
  "/api/airline/sri-lankan-airlines/receiveByNic",
  airlinesController.receiveSriLankanAirlinesByNic
);

router.post(
  "/api/airline/spicejet-airlines/receiveByNic",
  airlinesController.receiveSpiceJetAirlinesByNic
);

module.exports = router;
