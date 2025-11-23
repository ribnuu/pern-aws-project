const express = require("express");
const posExpensesController = require("../../controllers/pos-expenses/posExpenses.controller");
const router = express.Router();

router.post(
  "/api/point-of-sales/expenses/create",
  posExpensesController.createExpenseRecordController
);

router.get(
  "/api/point-of-sales/expenses/by-number/:expenseNumber",
  posExpensesController.getExpenseByNumberController
);

router.post(
  "/api/point-of-sales/search/users-in-the-pos-company/by-entity-type",
  posExpensesController.searchUsersInThePOSCompanyByEntityTypeController
);

router.post(
  "/api/point-of-sales/search/expenses-note",
  posExpensesController.searchExpensesNoteController
);

router.get(
  "/api/point-of-sales/expenses/headers/all-by-filters",
  posExpensesController.getAllExpensesInPOSCompanyController
);

router.get(
  "/api/point-of-sales/expenses/details/by-header-id/:headerId",
  posExpensesController.getExpensesDetailsByExpensesHeaderIdController
);

router.get(
  "/api/point-of-sales/expenses/expenses-measurement-units",
  posExpensesController.getExpensesMeasurementUnitsController
);

//Fetch price & units by note
router.get(
  "/api/point-of-sale/expenses/units-price-by-note/:searchTerm",
  posExpensesController.getExpensesPriceAndUnitsByNoteController
);

module.exports = router;
