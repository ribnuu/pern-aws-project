const express = require("express");
const posStockCustomerPersonController = require("../../controllers/pos-stock-customer-person/posStockCustomerPerson.controller");
const router = express.Router();

router.post(
  "/api/point-of-sales/stock-customer-person",
  posStockCustomerPersonController.insertStockCustomerPersonController
);

router.post(
  "/api/point-of-sales/stock-customer-person/search",
  posStockCustomerPersonController.searchStockCustomerPersonController
);

router.post(
  "/api/point-of-sales/stock-customer-person/search/by-mobile-number",
  posStockCustomerPersonController.fetchStockCustomerPersonByMobileNumberController
);

module.exports = router;
