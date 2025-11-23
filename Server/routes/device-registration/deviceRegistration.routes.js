const express = require("express");
const deviceRegistrationController = require("../../controllers/device-registration/deviceRegistration.controller");
const router = express.Router();

router.post(
  "/api/device-registration/receiveByNic",
  deviceRegistrationController.receiveByNic
);

router.post(
  "/api/device-registration/createDeviceRegistration",
  deviceRegistrationController.createDeviceRegistration
);

module.exports = router;
