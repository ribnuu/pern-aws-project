const express = require("express");
const gemController = require("../../controllers/gem/gem.controller");
const router = express.Router();

router.post("/api/gem/receiveByNic", gemController.receiveByNic);

module.exports = router;
