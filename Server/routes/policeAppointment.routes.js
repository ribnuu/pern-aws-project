const express = require('express');
const policeAppointmentController = require('../controllers/policeAppointment.controller');
const router = express.Router();

router.get('/policeAppointment/getAll' , policeAppointmentController.getAll)

router.post('/policeAppointment/set' , policeAppointmentController.setAppointment)

module.exports = router;