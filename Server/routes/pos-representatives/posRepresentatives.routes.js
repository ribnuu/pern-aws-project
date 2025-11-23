const express = require("express");
const posRepresentativesController = require("../../controllers/pos-representatives/posRepresentatives.controller");
const router = express.Router();

router.put(
  "/api/point-of-sales/stock-institution-representatives/create-and-update-users/:id",
  posRepresentativesController.createOrUpdateListOfRepresentativesInCustomerInstitutionController
);

router.get(
  "/api/point-of-sales/stock-institution-representatives/:id",
  posRepresentativesController.getAllInstitutionRepresentativesByInstitutionIdController
);

router.post(
  "/api/point-of-sales/stock-institution-representatives/search",
  posRepresentativesController.searchStockInstitutionRepresentativeController
);
module.exports = router;
