const express = require("express");
const MyDevicesController = require("../../controllers/MyDevices.controller");
const router = express.Router();

router.post("/api/MyDevices/receive", MyDevicesController.receiveMyDevices);
router.post(
  "/api/MyDevices/receiveAllData",
  MyDevicesController.receiveAllData
);
router.post(
  "/api/MyDevices/receiveAlterations",
  MyDevicesController.receiveAlterationsData
);
router.post(
  "/api/MyDevices/receiveReasons",
  MyDevicesController.receiveReasonData
);
router.post(
  "/api/MyDevices/receiveCategory",
  MyDevicesController.receiveCategory
);
router.post(
  "/api/MyDevices/receiveByNic",
  MyDevicesController.receiveMyDevicesByNic
);
router.post(
  "/api/MyDevices/receivePersonMissingData",
  MyDevicesController.receivePersonMissingData
);

module.exports = router;
