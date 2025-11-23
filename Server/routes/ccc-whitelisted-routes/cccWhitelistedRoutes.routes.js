const express = require("express");
const cccWhitelistedRoutesController = require("../../controllers/ccc-whitelisted-routes/cccWhitelistedRoutes.controller");
const router = express.Router();

router.post(
  "/api/ccc/whitelisted-routes",
  cccWhitelistedRoutesController.insertWhitelistedRouteRecordController
);

router.get(
  "/api/ccc/whitelisted-routes",
  cccWhitelistedRoutesController.getAllWhitelistedRoutesController
);

module.exports = router;
