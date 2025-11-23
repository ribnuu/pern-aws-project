const express = require('express');
const complaintController = require('../controllers/complaint.controller')
const router = express.Router();


router.post('/image' , complaintController.upload.single('file') , complaintController.addImagesToComplaint)

router.get('/complaint/getAll' , complaintController.getComplaints);
router.get('/viewImages' , complaintController.viewImages);
router.post('/complaint/set' , complaintController.setComplaint);
router.post('/complaint/image' , complaintController.addImagesToComplaint);




module.exports = router;    