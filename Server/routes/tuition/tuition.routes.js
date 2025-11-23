const express = require("express");
const tuitionController = require("../../controllers/Tuition/tuition.controller");
const router = express.Router();

router.post(
  "/api/tuition/createTutoryRecord",
  tuitionController.createTutoryRecord
);
router.post("/api/tuition/fetchAllTutory", tuitionController.fetchAllTutory);
router.post(
  "/api/tuition/createTutoryMaster",
  tuitionController.createTutoryMaster
);
router.post(
  "/api/tuition/createTuitionRecord",
  tuitionController.createTuitionRecord
);

router.post(
  "/api/tuition/receiveTuitionChildByNic",
  tuitionController.receiveTuitionChildByNic
);

module.exports = router;
