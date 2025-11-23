const express = require('express');
const ceaController = require('../../controllers/cea/cea.controller')
const router = express.Router();

router.post('/api/cea-license/receiveByNic' , ceaController.receiveByNic)

module.exports = router