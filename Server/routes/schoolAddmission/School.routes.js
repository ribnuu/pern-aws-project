const express = require("express");
const createSchool = require("../../controllers/schoolAddmission/School.controller");
const router = express.Router();

router.post("/api/school/createSchool", 
createSchool.createSchool);

module.exports = router;
