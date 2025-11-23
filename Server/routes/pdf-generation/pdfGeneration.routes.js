const express = require("express");
const pdfGenerationController = require("../../controllers/pdf-generation/pdfGeneration.controller");
const router = express.Router();

// ------------------- GET Endpoints ------------------- //

// GET endpoint to fetch a bill by its bill number
router.get(
  "/api/pdf-generation/pos/bill/:billNumber",
  pdfGenerationController.generateBillPdfByBillNumberController
);

module.exports = router;
