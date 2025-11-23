const express = require("express");
const addressController = require("../../controllers/ccc-address/cccAddress.controller");
const router = express.Router();

// Search routes for Province
router.get(
  "/api/ccc-address/provinces/search",
  addressController.searchProvinceController
);

// Search routes for District
router.get(
  "/api/ccc-address/districts/search",
  addressController.searchDistrictController
);

// Search routes for City
router.get(
  "/api/ccc-address/cities/search",
  addressController.searchCityController
);

module.exports = router;
