const express = require("express");
const checkInstitutionRepresentative = require("../../middlewares/pos/checkInstitutionRepresentative");
const checkCustomerPersonId = require("../../middlewares/pos/checkCustomerPersonId");
const repsStockDispatchController = require("../../controllers/pos-reps-stock-dispatch/posStockRepsDispatch.controller");
const router = express.Router();

router.post(
  "/api/point-of-sales/reps-stocks-dispatch",
  checkInstitutionRepresentative,
  repsStockDispatchController.createRepsStockDispatchRecordController
);

router.post(
  "/api/point-of-sales/reps-stocks-dispatch/by-stock-customer-person",
  checkInstitutionRepresentative,
  repsStockDispatchController.getRepsStockDispatchRecordsByStockCustomerPersonIdAndDateRangeController
);

// Just representatives cannot update, they should have admin or any other related privilages to make this request
router.put(
  "/api/point-of-sales/reps-stocks-dispatch/update-multiple-as-settled",
  checkCustomerPersonId,
  repsStockDispatchController.updateMultipleRepsStocksDispatchController
);

module.exports = router;
