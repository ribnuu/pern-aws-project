const express = require("express");
const cccPoliceStationController = require("../../controllers/ccc-police-station/cccPoliceStation.controller");
const router = express.Router();

router.get(
  "/api/ccc/police-station/search",
  cccPoliceStationController.searchPoliceStationController
);

router.post(
  "/api/ccc/police-station/assign-police-officer",
  cccPoliceStationController.assignPoliceOfficerToPoliceStationController
);

module.exports = router;
