const express = require("express");
const posBillManagementController = require("../../controllers/pos-bill-management/posBillManagement.controller");
const router = express.Router();

router.post(
  "/api/point-of-sales/manage-bills/all-bills-by-filters",
  posBillManagementController.getAllBillsInTheCompanyByFiltersController
);

router.delete(
  "/api/point-of-sales/manage-bills/:billNumber",
  posBillManagementController.markBillAsDeletedByBillNumberController
);

module.exports = router;
