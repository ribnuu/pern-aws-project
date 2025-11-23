const express = require("express");
const posTransactionsController = require("../../controllers/pos-transactions/posTransactions.controller");
const checkInstitutionRepresentative = require("../../middlewares/pos/checkInstitutionRepresentative");
const router = express.Router();

// Define a POST route for fetching POS transactions with various filters
router.post(
  "/api/point-of-sales/transactions",
  checkInstitutionRepresentative, // Middleware to check and validate institution representative
  posTransactionsController.getAllTransactionsByDateAndOtherFiltersController // Controller to handle the request and return the filtered transactions
);

router.post(
  "/api/point-of-sales/transactions/paid",
  checkInstitutionRepresentative, // Middleware to check and validate institution representative
  posTransactionsController.getAllPaidBillsInTheCompanyController // Controller to handle the request and return the filtered transactions
);

// POST endpoint to create a record in reps comission pay
router.post(
  "/api/point-of-sales/transactions/rep-com-pay",
  checkInstitutionRepresentative, // TODO Change this to get the stock_customer_person_id only , currently it gets unncessary data
  posTransactionsController.createRepsPaidComissionItemWiseController
);

router.post(
  "/api/point-of-sales/transactions/bill-data-and-reps-stock-dispatch",
  checkInstitutionRepresentative,
  posTransactionsController.getAllBillingInformationAndRepsStockDispatchDataByFiltersController
);

router.post(
  "/api/point-of-sales/payments-received-by-filters",
  checkInstitutionRepresentative,
  posTransactionsController.getAllPaymentsReceivedByFiltersController
);

module.exports = router;
