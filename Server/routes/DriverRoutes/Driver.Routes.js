const express = require("express");
const Drivercontroller = require("../../controllers/Driver/Driver.controller");
const router = express.Router();

//My Driver Registration controller
router.post("/api/Driver/CreateDriver", Drivercontroller.CreateDriver);

//Driver View Controller
router.post("/api/Driver/ViewDriver", Drivercontroller.ViewDriver);

module.exports = router;
