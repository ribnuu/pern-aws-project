const express = require("express");
const familyChart = require("../../controllers/FamilyChart/familyChart.controller");
const router = express.Router();

router.post("/api/family-chart/receiveSelf", familyChart.receiveSelf);

router.post("/api/family-chart/receiveFather", familyChart.receiveFather);
router.post("/api/family-chart/receiveMother", familyChart.receiveMother);

router.post("/api/family-chart/receiveChildren", familyChart.receiveChildren);

router.post("/api/family-chart/receiveSiblings", familyChart.receiveSiblings);

router.post(
  "/api/family-chart/receiveStepFather",
  familyChart.receiveStepFather
);

router.post(
  "/api/family-chart/receiveStepMother",
  familyChart.receiveStepMother
);

module.exports = router;
