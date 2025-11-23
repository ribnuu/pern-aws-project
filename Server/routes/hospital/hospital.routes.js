const express = require("express");
const hospitalController = require("../../controllers/hospital/hospital.controller");
const router = express.Router();

router.post("/api/hospital/receiveByNic", hospitalController.receiveByNic);

module.exports = router;
