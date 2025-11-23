const express = require("express");
const etfController = require("../../controllers/etf/etf.Controller");
const router = express.Router();

router.post("/api/etf/receiveByNic", etfController.receiveByNic);

module.exports = router;
