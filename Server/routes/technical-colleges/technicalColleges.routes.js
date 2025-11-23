const express = require('express');
const technicalCollegeController = require('../../controllers/technical-colleges/technicalColleges.controller');
const router = express.Router();


router.post('/api/technical-college/receiveByNic' , technicalCollegeController.receiveByNic)

module.exports = router