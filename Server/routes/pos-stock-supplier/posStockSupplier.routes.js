const express = require("express");
const posStockSupplierController = require("../../controllers/pos-stock-supplier/posStockSupplierController.controller");
const router = express.Router();

//search supplier by name or code
router.post(
  "/api/point-of-sale/stock/supplier/search",
  posStockSupplierController.posStockSupplierController
);

// Insert supplier in to table
router.post(
  "/api/point-of-sale/stock/supplier/enter-supplier",
  posStockSupplierController.posStockCeateSupplierController
);

module.exports = router;
