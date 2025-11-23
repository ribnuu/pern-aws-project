const express = require("express");
const posAutoSalesSystemController = require("../../controllers/pos-auto-sales-system/posAutoSalesSystem.controller");
const router = express.Router();

router.get(
  "/api/point-of-sales/auto-sales-system/get-first-bill-for-each-ins",
  posAutoSalesSystemController.getFirstBillsForEachInstitutionController
);

module.exports = router;
