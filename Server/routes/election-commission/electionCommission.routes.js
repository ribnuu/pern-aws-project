const express = require('express');
const electionCommissionController = require('../../controllers/election-commission/electionCommission.controller')
const router = express.Router();

router.post('/api/election/receiveByNic' , electionCommissionController.receiveElectionCommissionByNic)

module.exports = router