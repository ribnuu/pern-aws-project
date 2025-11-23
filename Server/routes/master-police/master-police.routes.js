const express = require('express');
const master_police_controller = require('../../controllers/master-police/master-police.controller');
const router = express.Router();


// --------------------------------- Station Routes --------------------------------

router.post('/police/master-police/addStation' , master_police_controller.addStation);
router.get('/police/master-police/viewStation' , master_police_controller.viewStation)

// ---------------------------------- STF Routes --------------------------------

router.post('/police/master-police/addSTF' , master_police_controller.addStfCamp);
router.get('/police/master-police/viewSTFCamp' , master_police_controller.viewSTFCamp)

// ---------------------------------- Provinces Routes --------------------------------

router.get('/police/master-police/viewProvinces' , master_police_controller.viewProvinces)

// ---------------------------------- District Routes --------------------------------

router.get('/police/master-police/getDistricts' , master_police_controller.getDistricts)
router.post('/police/master-police/getDistricts' , master_police_controller.getDistricts)

// -------------------------------- Designation Routes -----------------------------

router.post('/police/master-police/addDesignation' , master_police_controller.addDesignation)

// -------------------------------- Police Officer Routes -----------------------------

router.post('/police/master-police/addPoliceUser' , master_police_controller.addPoliceOfficer)
router.get('/police/master-police/getPoliceOfficer' , master_police_controller.getPoliceOfficer)
router.patch('/police/master-police/assignPoliceOfficer' , master_police_controller.assignPolice)




module.exports = router