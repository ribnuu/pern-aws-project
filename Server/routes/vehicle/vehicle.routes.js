const express = require("express");

const VehicleController = require("../../controllers/vehicle/vehicle.controller");

const router = express.Router();

router.post("/api/vehicle/receiveByNic", VehicleController.receiveVehicleByNic);
router.post("/api/vehicle/receiveNicByVehicleNumber", VehicleController.receiveNicByVehicleNumber);
router.post("/api/vehicle/receiveVehicleMissingData", VehicleController.receiveVehicleMissingData);

module.exports = router;
