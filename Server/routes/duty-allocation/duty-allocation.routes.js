const express = require('express');
const dutyController = require('../../controllers/duty-allocation/duty-allocation.controller');
const router = express.Router();

router.post('/duty-allocation/addDuty', dutyController.addDuty)

module.exports = router;