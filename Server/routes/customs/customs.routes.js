const express = require("express");
const customsController = require("../../controllers/customs/customs.controller");
const router = express.Router();
router.post(
  "/api/customs/receiveIndividualByNic",
  customsController.receiveIndividualByNic
);

router.post(
  "/api/customs/receiveIndividualCurrencyDeclarationByNic",
  customsController.receiveIndividualCurrencyDeclarationByNic
);

router.post(
  "/api/customs/receiveIndividualCasesByNic",
  customsController.receiveIndividualCasesByNic
);

router.post(
  "/api/customs/receiveVehiclesByNic",
  customsController.receiveVehiclesByNic
);

router.post(
  "/api/customs/receiveCustomsCompany",
  customsController.receiveCustomsCompany
);

router.post(
  "/api/customs/receiveCompanyCasesByNic",
  customsController.receiveCompanyCasesByNic
);
router.post(
  "/api/customs/receiveDeclaration",
  customsController.receiveDeclaration
);

module.exports = router;
