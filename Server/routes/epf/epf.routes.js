const express = require("express");
const epfController = require("../../controllers/epf/epf.controller");
const router = express.Router();

router.post("/api/epf/receiveByNic", epfController.receiveByNic);

module.exports = router;
