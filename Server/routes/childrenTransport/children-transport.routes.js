const express = require("express");
const transportController = require("../../controllers/childrenTransport/children-transport.controller");
const router = express.Router();

router.post(
  "/api/transport/receiveTransportChildByNic",
  transportController.receiveTransportChildByNic
);


module.exports = router;
