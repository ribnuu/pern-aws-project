const express = require("express");
const schoolController = require("../../controllers/school/departmentSchool.controller");
const router = express.Router();

router.post("/api/school/createSchoolRecord", schoolController.createSchoolRecord);

module.exports = router;
