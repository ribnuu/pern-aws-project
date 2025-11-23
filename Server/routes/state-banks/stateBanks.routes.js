const express = require("express");
const stateBankController = require("../../controllers/state-banks/stateBanks.controller");

const router = express.Router();

router.post(
  "/api/state-banks/receiveByNic",
  stateBankController.receiveAccountByNic
);
router.post("/api/state-banks/receive", stateBankController.receiveAccount);
router.post(
  "/api/banks/receiveByAccountNumber",
  stateBankController.receiveBankStatementByAccountNumber
);
router.post(
  "/api/banks/receiveAccountDetailsByAccountNumber",
  stateBankController.receiveAccountsDetailsByAccountNumber
);

module.exports = router;
