const express = require('express');
const policeRatingController = require('../controllers/policeRating.controller')
const router = express.Router();

router.post('/policeRating/set' , policeRatingController.setPoliceRating);


module.exports = router;    