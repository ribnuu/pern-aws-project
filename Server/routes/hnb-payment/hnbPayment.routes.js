const express = require("express");
// const crypto = require("crypto");
const hnbPaymentController = require("../../controllers/hnb-payment/hnbPayment.controller");
const testQueries = require("../../services/test/queries");
const {
  generateTrafficFineReferenceNumber,
} = require("../../helpers/ccc/generateTrafficFineRefNo");
const router = express.Router();

//
router.post(
  "/api/hnb/create-signature",
  hnbPaymentController.createSignatureController
);

// Endpoint that is given to the bank, when a payment is happening the payment gateway will notify this url
router.post(
  "/api/hnb-merchant-notification",
  hnbPaymentController.notifyPaymentInfoController
);

// router.post("/api/hnb-callback", async (req, res) => {
//   try {
//     console.info("HNB CALLBACK EXECUTED");
//     console.log(req.body);
//     res.json({ success: true });
//   } catch (error) {
//     console.error(error);
//     req
//       .status(500)
//       .send({ error: "An error occurred processing hnb-callback" });
//   }
// });

router.post("/api/test-test", async (req, res) => {
  try {
    // const response = await testQueries.getAllRepsCommissionPayQuery();
    // generateTrafficFineReferenceNumber.
    const response = await generateTrafficFineReferenceNumber();
    res.json({ data: response });
  } catch (error) {
    res.status(500).send({ error: error.toString() });
  }
});

module.exports = router;
