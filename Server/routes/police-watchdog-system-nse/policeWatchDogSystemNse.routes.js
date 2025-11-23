const express = require("express");
const policeWatchDogControllerNse = require("../../controllers/police-watchdog-system-nse/policeWatchDogSystemNse.controller");
const router = express.Router();

router.post(
  "/api/police-watch-dog-system-nse/receiveMyDevicesListByNic",
  policeWatchDogControllerNse.receiveMyDevicesListByNic
);

router.post(
  "/api/police-watch-dog-system-nse/receiveMissingPetListByNic",
  policeWatchDogControllerNse.receiveMissingPetListByNic
);

router.post(
  "/api/police-watch-dog-system-nse/receiveMissingVehicleListByNic",
  policeWatchDogControllerNse.receiveMissingVehicleListByNic
);

router.post(
  "/api/police-watch-dog-system-nse/receiveWantedPersonListByNic",
  policeWatchDogControllerNse.receiveWantedPersonListByNic
);

router.post(
  "/api/police-watch-dog-system-nse/receiveBlackListedPhonesListByNic",
  policeWatchDogControllerNse.receiveBlacklistedPhonesListByNic
);

router.post(
  "/api/police-watch-dog-system-nse/receiveEmergencyHandlerByNic",
  policeWatchDogControllerNse.receiveEmergencyHandlerByNic
);

router.post(
  "/api/police-watch-dog-system-nse/receiveMissingOtherItemsListByNic",
  policeWatchDogControllerNse.receiveMissingOtherItemsListByNic
);

router.post(
  "/api/police-watch-dog-system-nse/receiventryBanDetectionByNic",
  policeWatchDogControllerNse.receiventryBanDetectionByNic
);

router.post(
  "/api/police-watch-dog-system-nse/receiveNumberPlateMismatchByNic",
  policeWatchDogControllerNse.receiveNumberPlateMismatchByNic
);
router.post(
  "/api/police-watch-dog-system-nse/receiveUnavailableNumberPlateByNic",
  policeWatchDogControllerNse.receiveUnavailableNumberPlateByNic
);

router.post(
  "/api/police-watch-dog-system-nse/receiveFindPersonOrVehicleByNic",
  policeWatchDogControllerNse.receiveFindPersonOrVehicleByNic
);

router.post(
  "/api/police-watch-dog-system-nse/receiveAbnormalCrowdDetectionByNic",
  policeWatchDogControllerNse.receiveAbnormalCrowdDetectionByNic
);

router.post(
  "/api/police-watch-dog-system-nse/receiveSuspectedTreasureHuntersByNic",
  policeWatchDogControllerNse.receiveSuspectedTreasureHuntersByNic
);

module.exports = router;
