const express= require('express');
const votersRegistrationController = require('../../controllers/voters-registration/votersRegistration.controller');
const router = express.Router();

router.post('/api/voter/receiveByNic' , votersRegistrationController.receiveVoterByNic)

module.exports = router;