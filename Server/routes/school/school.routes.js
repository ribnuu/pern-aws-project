const express = require("express");
const schoolController = require("../../controllers/school/school.controller");
const router = express.Router();

router.post("/api/school/receiveByNic", schoolController.receiveByNic);

router.post(
  "/api/school/receiveSchoolChildByNic",
  schoolController.receiveSchoolChildByNic
);


module.exports = router;
