const express = require("express");
const cccTrafficOffensereportController = require("../../controllers/ccc-traffic-offense-report/cccTrafficOffenseReport.controller");
const router = express.Router();

router.post(
  "/api/ccc-traffic-offense-report/get-license-in-hand",
  cccTrafficOffensereportController.getLicenseInHandController
);

module.exports = router;
