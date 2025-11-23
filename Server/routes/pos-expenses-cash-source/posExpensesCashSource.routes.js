const express = require("express");
const posExpensesCashSourceController = require("../../controllers/pos-expenses-cash-source/posExpensesCashSource.controller");
const router = express.Router();

// POST endpoint to create new category
router.get(
  "/api/point-of-sales/pos-expenses-cash-source/header",
  posExpensesCashSourceController.getAllExpensesCashSourceHeadersController
);

module.exports = router;
