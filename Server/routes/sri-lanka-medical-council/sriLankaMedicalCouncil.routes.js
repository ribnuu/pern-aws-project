const express = require("express");
const sriLankaMedicalCouncilController = require("../../controllers/sri-lanka-medical-council/sriLankaMedicalCouncil.controller");
const router = express.Router();

router.post(
  "/api/sri-lanka-medical-council/receiveByNic",
  sriLankaMedicalCouncilController.receiveByNic
);

module.exports = router;
