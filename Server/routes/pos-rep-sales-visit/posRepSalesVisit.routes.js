const express = require("express");
const posRepsSalesVisitController = require("../../controllers/pos-rep-sales-visit/posRepsSalesVisit.controller");
const router = express.Router();

router.get(
  "/api/point-of-sales/rep-sales-visit/latest",
  posRepsSalesVisitController.getAllLatestRepSalesVisitsController
);

router.post(
  "/api/point-of-sales/rep-sales-visit",
  posRepsSalesVisitController.insertStockRepVisitController
);
module.exports = router;
