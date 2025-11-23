const express = require("express");
const posStockItemController = require("../../controllers/pos-stock-item/posStockItem.controller");
const router = express.Router();

// Define a POST route for fetching POS transactions with various filters
router.post(
  "/api/point-of-sales/stock-item/search",
  posStockItemController.searchStockItemHeadersInTheCompanyController // Controller to handle the request and return the filtered transactions
);

module.exports = router;
