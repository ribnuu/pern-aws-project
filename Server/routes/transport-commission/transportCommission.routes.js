const express = require("express");
const transportCommissionController = require("../../controllers/transport-commission/transportCommission.controller");
const router = express.Router();

router.post(
  "/api/transport-commission/receiveByNic",
  transportCommissionController.receiveByNic
);

router.post(
  "/api/transport-commission/receiceByVehicleNumber",
  transportCommissionController.receiceByVehicleNumber
);

router.post(
  "/api/transport-commission/createPermit",
  transportCommissionController.createPermit
);

router.post(
  "/api/transport-commission/getAll",
  transportCommissionController.getAll
)

module.exports = router;
