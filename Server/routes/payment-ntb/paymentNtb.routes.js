const express = require("express");
// const crypto = require("crypto");
const hnbPaymentController = require("../../controllers/payment-ntb/paymentNtb.controller");

const router = express.Router();

router.post(
  "/api/ipg/ntb/initiate-checkout",
  hnbPaymentController.initiateCheckoutController
);

module.exports = router;
