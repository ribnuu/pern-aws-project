const express = require('express');
const passportController = require('../../controllers/passport/passport.controller')
const router = express.Router();

router.post('/api/passport/receive' , passportController.receivePassport)
router.post('/api/passport/receivePassportMissingDataByPassportNumber' , passportController.receivePassportMissingDataByPassportNumber)
router.post('/api/passport/receivePassportMissingDataByReportedBy' , passportController.receivePassportMissingDataByReportedBy)
router.post('/api/passport/receiveByNic' , passportController.receivePassportByNic)
router.post('/api/passport/receiveAllData' , passportController.receiveAllData)
router.post('/api/passport/receiveAlterations' , passportController.receiveAlterationsData)
router.post('/api/passport/receiveReasons' , passportController.receiveReasonData)

module.exports = router