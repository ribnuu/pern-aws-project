const express = require("express");
const examinationController = require("../../controllers/examination/examination.controller");
const router = express.Router();

router.post(
  "/api/ol/receiveByNic",
  examinationController.receiveOLResultsByNic
);
router.post(
  "/api/al/receiveByNic",
  examinationController.receiveALResultsByNic
);

module.exports = router;
