const express = require("express");
const councilController = require("../../controllers/council/council.controller");
const router = express.Router();

router.post(
  "/api/council/urban/receiveByNic",
  councilController.receiveUrbanCouncilByNic
);
router.post(
  "/api/council/municipal/receiveByNic",
  councilController.receiveMunicipalCouncilByNic
);
router.post(
  "/api/council/pradeshiya-sabha/receiveByNic",
  councilController.receivePradeshiyaSabhaByNic
);

module.exports = router;
