const express= require('express');
const cribController = require('../../controllers/crib/crib.controller')
const router = express.Router();

router.post('/api/crib/receiveByNic' , cribController.receiveByNic)

module.exports = router