const express = require("express");
const posStockCustomerInstitutionController = require("../../controllers/pos-stock-customer-institution/posStockCustomerInstitution.controller");
const checkInstitutionRepresentative = require("../../middlewares/pos/checkInstitutionRepresentative");
const router = express.Router();

// GET
router.post(
  "/api/point-of-sales/stock-customer-institution/unique-item-codes-for-institutions",
  async (req, res, next) => {
    if (req.body.filters && req.body.filters.representativeId) {
      req.headers.user_id = req.body.filters.representativeId;
    }

    if (req.body.filters && req.body.filters.stockCustomerInstitutionId) {
      req.institution_ids = [req.body.filters.stockCustomerInstitutionId];
      next();
    } else {
      await checkInstitutionRepresentative(req, res, next);
    }
  },

  posStockCustomerInstitutionController.getUniqueItemCodesForEachInstitutionController
);

// GET endpoint to fetch all the customer institutions in the company
router.get(
  "/api/point-of-sales/stock-customer-institution",
  posStockCustomerInstitutionController.getAllStockCustomerInstitutionsController
);

// GET endpoint to retrieve a stock customer institution by ID
router.get(
  "/api/point-of-sales/stock-customer-institution/:id",
  posStockCustomerInstitutionController.getAllCustomerPersonsByCustomerInstitutionIdController
);

// GET endpoint to retrieve a company logo by ID
router.get(
  "/api/point-of-sales/stock-customer-institution/logo/:id",
  posStockCustomerInstitutionController.getStockCustomerInstitutionLogoFilePathController
);

// POST endpoint to create a stock customer institution
router.post(
  "/api/point-of-sales/stock-customer-institution",
  posStockCustomerInstitutionController.createStockCustomerInstitutionController
);

// PUT endpoint to update a stock customer institution by ID
router.put(
  "/api/point-of-sales/stock-customer-institution/:id",
  posStockCustomerInstitutionController.updateStockCustomerInstitutionController
);

// PUT endpoint to create or update a list of persons in a customer institution
router.put(
  "/api/point-of-sales/stock-customer-institution/create-and-update-users/:id",
  posStockCustomerInstitutionController.createOrUpdateListOfPersonsInCustomerInstitutionController
);

// PUT endpoint to mark user in the company as is_delete true or false
router.put(
  "/api/point-of-sales/stock-customer-institution/customer-person/:userId/:insId/toggle-deletion",
  posStockCustomerInstitutionController.stockCustomerInstitutionToggleDeletionController
);

router.post(
  "/api/point-of-sales/stock-customer-institution/by-institution-id",
  posStockCustomerInstitutionController.getStockCustomerInstitutionByInstitutionIdController
);

module.exports = router;
