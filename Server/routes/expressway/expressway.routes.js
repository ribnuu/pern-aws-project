const express = require("express");
const expresswayController = require("../../controllers/expressway/expressway.controller");

const router = express.Router();

router.post("/api/expressway/receiveByNic", expresswayController.receiveByNic);
router.post(
  "/api/expressway/receiveByVehicleNumber",
  expresswayController.receiveByVehicleNumber
);

module.exports = router;
