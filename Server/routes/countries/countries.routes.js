const express = require("express");
const getCountriesController = require("../../controllers/countries/countries.controller");
const router = express.Router();

router.get("/api/countries", getCountriesController.getCountriesController);

module.exports = router;
