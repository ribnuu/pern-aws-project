const express = require("express");
const offensesController = require("../../controllers/department-drivers-offense-master/departmentDriversOffenseMaster.controller");

const router = express.Router();

router.get("/api/departmentDriversOffenseMaster", offensesController.getAllMasterOffenses);

module.exports = router;
