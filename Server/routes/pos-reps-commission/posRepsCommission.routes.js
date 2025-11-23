const express = require("express");
const posRepsCommissionController = require("../../controllers/pos-reps-commission/posRepsCommission.controller");
const checkTest = require("../../middlewares/pos/checkTest");
const router = express.Router();

router.get(
  "/api/pos-reps-commission",
  posRepsCommissionController.getAllRepsCommissionPayController
);

router.get(
  "/api/pos-reps-commission/generate-pdf-repoprt",
  posRepsCommissionController.generateRepsCommissionReportPdfController
);

module.exports = router;
