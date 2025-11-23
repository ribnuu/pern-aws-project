const express = require("express");
const cccDepartmentSearchHistoryController = require("../../controllers/ccc-department-search-history/cccDepartmentSearchHistory.controller");
const router = express.Router();

router.post(
  "/api/department-search-history",
  cccDepartmentSearchHistoryController.createDepartmentDriverLicenseDispatchRecordController
);

module.exports = router;
