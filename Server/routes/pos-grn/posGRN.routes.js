const express = require("express");
const posGENContoller = require("../../controllers/pos-grn/posGRN.controller");

const router = express.Router();

router.post("/api/pos/grn/details", posGENContoller.createGrnDetailsController);

//Search GRN by GRN Number or date
router.post(
  "/api/pos/grn/getGrnByNumber",
  posGENContoller.getGrnByNumberController
);

module.exports = router;
