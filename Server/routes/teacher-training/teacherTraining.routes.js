const express = require('express');
const teacherTrainingController = require('../../controllers/teacher-training/teacherTraining.controller');
const router = express.Router();

router.post('/api/teacher-training/receiveByNic' , teacherTrainingController.receiveByNic)

module.exports = router;