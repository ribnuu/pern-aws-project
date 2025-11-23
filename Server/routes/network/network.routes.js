const express = require("express");
const networkController = require("../../controllers/networks/networks.controller");
const router = express.Router();

router.post("/api/network/receiveByNic", networkController.receiveByNic);

module.exports = router;
