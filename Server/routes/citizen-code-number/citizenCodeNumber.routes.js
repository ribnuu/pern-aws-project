const express = require("express");
const citizenCodeNumberRoutes = require("../../controllers/citizen-code-number/citizenCodeNumber.controller");
const router = express.Router();

router.post(
  "/api/citizencodenumber/receiveByCodeNumber",
  citizenCodeNumberRoutes.receiveByCodeNumber
);

module.exports = router;
