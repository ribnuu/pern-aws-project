const express = require("express");
const taxiController = require("../../controllers/taxi/taxi.controller");
const router = express.Router();

router.post("/api/taxi/uber/receiveByNic", taxiController.receiveUberByNic);
router.post(
  "/api/taxi/uber/receiveAccountDetailsByNic",
  taxiController.receiveAccountUberDetailsByNic
);

router.post("/api/taxi/pickme/receiveByNic", taxiController.receivePickMeByNic);
router.post(
  "/api/taxi/pickme/receiveAccountDetailsByNic",
  taxiController.receiveAccountPickMeDetailsByNic
);

router.post(
  "/api/taxi/kangaroo/receiveByNic",
  taxiController.receiveKangarooByNic
);
router.post(
  "/api/taxi/kangaroo/receiveAccountDetailsByNic",
  taxiController.receiveAccountKangarooDetailsByNic
);

router.post(
  "/api/taxi/taxiyak/receiveByNic",
  taxiController.receiveTaxiyakByNic
);
router.post(
  "/api/taxi/taxiyak/receiveAccountDetailsByNic",
  taxiController.receiveAccountTaxiyakDetailsByNic
);

router.post(
  "/api/taxi/uber/receiveUberVehicleDetailsByVehicleNumber",
  taxiController.receiveUberVehicleDetailsByVehicleNumber
);

router.post(
  "/api/taxi/pickme/receivePickMeVehicleDetailsByVehicleNumber",
  taxiController.receivePickMeVehicleDetailsByVehicleNumber
);
router.post(
  "/api/taxi/taxiyak/receiveTaxiyakVehicleDetailsByVehicleNumber",
  taxiController.receiveTaxiyakVehicleDetailsByVehicleNumber
);
router.post(
  "/api/taxi/kangaroo/receiveKangarooVehicleDetailsByVehicleNumber",
  taxiController.receiveKangarooVehicleDetailsByVehicleNumber
);

module.exports = router;
