const express = require('express');
const warrantedController = require('../controllers/warrantedPeople.controller')
const router = express.Router();

router.get('/warranted/getAll' , warrantedController.getWarrantedPeople);
router.post('/warranted/set' , warrantedController.setWarrantedPeople);

module.exports = router;    