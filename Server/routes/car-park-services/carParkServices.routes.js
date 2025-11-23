const express = require("express");
const carParkServicesController = require("../../controllers/car-park-services/carParkServices.controller");
const router = express.Router();

router.post(
  "/api/car-park-services/one-galle-face/receiveByNic",
  carParkServicesController.receiveCarParkOneGalleFaceByNic
);
router.post(
  "/api/car-park-services/colombo-city-centre/receiveByNic",
  carParkServicesController.receiveCarParkColomboCityCentreByNic
);
router.post(
  "/api/car-park-services/nawaloka-hospital/receiveByNic",
  carParkServicesController.receiveCarParkNawalokaHospitalByNic
);
router.post(
  "/api/car-park-services/delmon-hospital/receiveByNic",
  carParkServicesController.receiveCarParkDelmonHospitalByNic
);

// Search by vehicle number

router.post(
  "/api/car-park-services/one-galle-face/receiveCarParkOneGalleFaceByVehicleNumber",
  carParkServicesController.receiveCarParkOneGalleFaceByVehicleNumber
);
router.post(
  "/api/car-park-services/colombo-city-centre/receiveCarParkColomboCityCentreByVehicleNumber",
  carParkServicesController.receiveCarParkColomboCityCentreByVehicleNumber
);
router.post(
  "/api/car-park-services/nawaloka-hospital/receiveCarParkNawalokaHospitalByVehicleNumber",
  carParkServicesController.receiveCarParkNawalokaHospitalByVehicleNumber
);
router.post(
  "/api/car-park-services/delmon-hospital/receiveCarParkDelmonHospitalByVehicleNumber",
  carParkServicesController.receiveCarParkDelmonHospitalByVehicleNumber
);

module.exports = router;
