const express = require('express')
const policeSceneReportingController = require('../controllers/policeSceneReporting.controller');
const router = express.Router();

router.post('/policescenereporting/set' , policeSceneReportingController.setPoliceSceneReporting)
router.get('/policescenereporting/get' , policeSceneReportingController.getPoliceSceneReporting)

module.exports = router;