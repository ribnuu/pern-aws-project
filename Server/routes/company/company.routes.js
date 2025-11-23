const express = require('express');
const companyRoutes = require('../../controllers/company/company.controller');
const router = express.Router();

router.post('/api/company/receiveByNic' , companyRoutes.receiveByNic)

module.exports = router
