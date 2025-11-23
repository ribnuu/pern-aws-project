const express = require("express");
const houseHoldersController = require("../../controllers/house-holders/houseHolders.controller");
const router = express.Router();

// // Route for creating a householder
// router.post(
//   "/api/householders/create",
//   houseHoldersController.createHouseholderController
// );

// // Route for creating a chief occupant
// router.post(
//   "/api/householders/create-chief-occupant",
//   houseHoldersController.createChiefOccupantController
// );

// // Route for creating a family member
// router.post(
//   "/api/householders/create-family-member",
//   houseHoldersController.createFamilyMemberController
// );

// // Route for creating an other resident
// router.post(
//   "/api/householders/create-other-resident",
//   houseHoldersController.createOtherResidentController
// );

// // Route for getting all residents of a house
// router.get(
//   "/api/householders/:houseId/residents",
//   houseHoldersController.getAllResidentsForHouseController
// );

// New route for adding the whole process of householder
router.post(
  "/api/ccc/householders/create-full-process",
  houseHoldersController.createFullHouseholderProcessController
);

router.get(
  "/api/ccc/householders/house-holders",
  houseHoldersController.getAllHouseHoldersController
);

router.get(
  "/api/ccc/householders/house-holders/:id/data",
  houseHoldersController.getHouseHoldersDataByIdController
);

// Create a router to fetch all details about house holders, including associated data
router.get(
  "/api/ccc/householders/house-holders/data",
  houseHoldersController.getHouseHolderDataController
);

router.put(
  "/api/ccc/householders/house-holders/:id",
  houseHoldersController.updateHouseHoldersDataByIdController
);

//create a route for updating confirmation info
router.put(
  "/api/ccc/householders/house-holders/confirm/:id",
  houseHoldersController.updateHouseHolderVerificationByIdController
);

module.exports = router;
