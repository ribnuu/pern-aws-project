const express = require("express");
const posBillpayController = require("../../controllers/pos-billpay/posBillpay.controller");
// const checkUserAffiliations = require("../../middlewares/ccc/checkUserAffiliations");
const checkInstitutionRepresentative = require("../../middlewares/pos/checkInstitutionRepresentative");
const router = express.Router();

router.post(
  "/api/point-of-sales/bill-pay/pending-bill-headers/all",
  async (req, res, next) => {
    if (req.body.filters && req.body.filters.representativeId) {
      req.headers.user_id = req.body.filters.representativeId;
    }

    if (req.body.filters && req.body.filters.stockCustomerInstitutionId) {
      req.institution_ids = [req.body.filters.stockCustomerInstitutionId];
      next(); // Proceed to the next middleware or route handler
    } else {
      // Use checkInstitutionRepresentative as middleware
      await checkInstitutionRepresentative(req, res, next);
    }
  },
  posBillpayController.getAllPendingBillHeadersInTheCompanyController
);

router.post(
  "/api/point-of-sales/bill-pay/pending-bill-headers/by-customer-institution-id",
  posBillpayController.getAllPendingBillHeadersByStockCustomerInstitutionIdController
);

router.post(
  "/api/point-of-sales/bill-pay/pay",
  posBillpayController.makeBillPaymentController
);

module.exports = router;
