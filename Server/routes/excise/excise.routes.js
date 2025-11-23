const express = require('express');
const exciseController = require('../../controllers/excise/excise.controller');
const router = express.Router();

router.post('/api/excise/receiveByNic' , exciseController.receiveByNic)

module.exports = router;