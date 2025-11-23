const express = require('express');
const nicController = require('../../controllers/nic/nic.controller')
const router = express.Router();

router.post('/api/nic/receive' , nicController.receiveNic)
router.post('/api/nic/receiveAllData' , nicController.receiveAllData)
router.post('/api/nic/receiveAlterations' , nicController.receiveAlterationsData)
router.post('/api/nic/receiveReasons' , nicController.receiveReasonData)
router.get('/api/nic/response' , nicController.receiveNic)
router.post('/api/nic/receiveMissingData' , nicController.receiveNicMissingData)
router.post('/api/nic/receiveNicMissingDataByReportedBy', nicController.receiveNicMissingDataByReportedBy)

module.exports = router