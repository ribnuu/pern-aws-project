const express = require('express');
const licenseController = require('../../controllers/license/license.controller')
const router = express.Router();

router.post('/api/license/receive' , licenseController.receiveLicense)
router.post('/api/license/receiveAllData' , licenseController.receiveAllData)
router.post('/api/license/receiveAlterations' , licenseController.receiveAlterationsData)
router.post('/api/license/receiveReasons' , licenseController.receiveReasonData)
router.post('/api/license/receiveCategory' , licenseController.receiveCategory)
router.post('/api/license/receiveByNic' , licenseController.receiveLicenseByNic)
router.post('/api/license/receiveLicenseMissingData' , licenseController.receiveLicenseMissingData)
router.post('/api/license/receiveLicenseMissingDataByReportedBy',licenseController.receiveLicenseMissingDataByReportedBy)

module.exports = router