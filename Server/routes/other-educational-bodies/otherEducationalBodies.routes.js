const express = require("express");
const otherEducationalController = require("../../controllers/other-educational-bodies/otherEducationalBodies.controller");
const router = express.Router();

router.post(
  "/api/other-educational-bodies/teacher-training/receiveByNic",
  otherEducationalController.receiveTeacherTrainingByNic
);
router.post(
  "/api/other-educational-bodies/technical-college/receiveByNic",
  otherEducationalController.receiveTechnicalCollegeByNic
);
router.post(
  "/api/other-educational-bodies/naita/receiveByNic",
  otherEducationalController.receiveNaitaByNic
);
router.post(
  "/api/other-educational-bodies/tvec/receiveByNic",
  otherEducationalController.receiveTVECByNic
);
router.post(
  "/api/other-educational-bodies/ichem/receiveByNic",
  otherEducationalController.receiveICHEMByNic
);

module.exports = router;
