const express = require('express');
const inlandRevenueController = require('../../controllers/inland-revenue/inlandRevenue.controller')
const router = express.Router();

router.post('/api/inland-revenue/receiveByNic' , inlandRevenueController.receiveByNic);

module.exports = router;