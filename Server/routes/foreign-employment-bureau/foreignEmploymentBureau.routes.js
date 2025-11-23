const express = require("express");
const foreignEmploymentBureauController = require("../../controllers/foreign-employment-bureau/foreignEmploymentBureau.controller");
const router = express.Router();

router.post(
  "/api/foreign-employment-bureau/receiveByPassport",
  foreignEmploymentBureauController.receiveByPassport
);

router.post(
  "/api/foreign-employment-bureau/receiveByNic",
  foreignEmploymentBureauController.receiveByNic
);

module.exports = router;
