const express = require("express");
const universityController = require("../../controllers/university/university.controller");
const router = express.Router();

router.post("/api/university/receiveByNic", universityController.receiveByNic);

module.exports = router;
