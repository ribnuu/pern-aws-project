const express = require("express");
const cccPoliceTrafficOffenseInsightsController = require("../../controllers/ccc-police-traffic-offense-insights/cccPoliceTrafficOffenseInsights.controller");
const router = express.Router();

router.get(
  "/api/ccc/police-traffic-offense-report/license-in-hand-by-filters",
  cccPoliceTrafficOffenseInsightsController.getLicenseInHandByFiltersController
);

module.exports = router;
