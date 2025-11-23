const express = require("express");
const atomicEnergyController = require("../../controllers/atomic-energy-authority/atomicEnergyAuthority.controller");
const router = express.Router();

router.post(
  "/api/atomic-enerygy-authority/receiveByNic",
  atomicEnergyController.receiveTechniciansByNic
);

router.post(
  "/api/atomic-enerygy-authority/receiveMachinesByNic",
  atomicEnergyController.receiveMachinesByNic
);

module.exports = router;
