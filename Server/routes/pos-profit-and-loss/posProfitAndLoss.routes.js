const express = require("express");
const profitAndLossController = require("../../controllers/pos-profit-and-loss/posProfitAndLoss.controller");
const router = express.Router();

router.get(
  "/api/point-of-sales/profit-and-loss/get-profit-and-loss-data",
  profitAndLossController.getProfitAndLossDataController
);

router.get(
  "/api/point-of-sales/profit-and-loss/get-profit-and-loss-data-update",
  profitAndLossController.getProfitAndLossUpdateDataController
);
module.exports = router;
