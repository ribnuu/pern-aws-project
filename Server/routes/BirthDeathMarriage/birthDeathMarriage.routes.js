const express = require("express");
const birthDeathMarriageController = require("../../controllers/BirthDeathMarriage/birthDeathMarriage.controller");
const router = express.Router();

// Birth Certificate
router.post(
  "/api/birth/create",
  birthDeathMarriageController.insertBirthCertificate
);
router.post(
  "/api/birth/fetchFatherNic",
  birthDeathMarriageController.fetchFatherNic
);
router.post(
  "/api/birth/fetchMotherNic",
  birthDeathMarriageController.fetchMotherNic
);

// Marriage Certificate
router.post(
  "/api/marriage/fetchGroomNic",
  birthDeathMarriageController.fetchGroomNic
);

router.post(
  "/api/marriage/fetchBrideNic",
  birthDeathMarriageController.fetchBrideNic
);

router.post(
  "/api/marriage/fetchWitnessOne",
  birthDeathMarriageController.fetchWitnessOne
);

router.post(
  "/api/marriage/fetchWitnessTwo",
  birthDeathMarriageController.fetchWitnessTwo
);

router.post(
  "/api/marriage/createMarriageCertificate",
  birthDeathMarriageController.createMarriageCertificate
);

// Death Certificate

router.post(
  "/api/death/fetchDeadPersonNic",
  birthDeathMarriageController.fetchDeadPersonNic
);
router.post(
  "/api/death/createDeathCertificate",
  birthDeathMarriageController.createDeathCertificate
);


// NSE Fetch Parents

router.post(
  "/api/birth/fetchParents",birthDeathMarriageController.fetchParents
)
router.post(
  "/api/birth/fetchMarriageCertificateByNicNumber",birthDeathMarriageController.fetchMarriageCertificateByNicNumber
)



module.exports = router;
