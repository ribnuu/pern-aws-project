const express = require("express");
const posInstitutionStockActivityCheckController = require("../../controllers/pos-institution-stock-activity-check/posInstitutionStockActivityCheck.controller");
const router = express.Router();

router.post(
  "/api/point-of-sales/institution-stock-activity-check/all",
  posInstitutionStockActivityCheckController.getInstitutionStockActivityCheckDataController
);

module.exports = router;
