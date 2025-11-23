const express = require("express");
const userController = require("../../controllers/user/user.controller");
const authController = require("../../controllers/auth/auth.controller");

const router = express.Router();

router.post("/api/user/login", userController.login);
// router.post(
//   "/api/user/loginWithMobileumber",
//   userController.loginWithMobileNumber
// );
router.post(
  "/api/user/loginWithMobileumber",
  authController.loginWithMobileNumberController
);
router.post(
  "/api/user/loginWithMobileumber/confirmOtp",
  userController.loginWithMobileNumberConfirmOtp
);
// router.post(
//   "/api/user/registerWithMobileNumber",
//   userController.loginWithMobileNumber
// );
router.post(
  "/api/user/registerWithMobileNumber",
  authController.loginWithMobileNumberController
);
router.post(
  "/api/user/registerWithMobileNumber/confirmOtp",
  userController.loginWithMobileNumberConfirmOtp
);
router.post("/api/user/logout", userController.logout);
router.post("/api/user/register", userController.register);
router.post("/api/user/registerAdvanced", userController.registerAdvanced);
router.post(
  "/api/user/registerAdvanced/confirmOtp",
  userController.registerAdvancedConfirmOtp
);
router.post("/api/user/getRoles", userController.getRoles);
router.post("/api/user/getGroups", userController.getGroups);
router.post("/api/user/getUsers", userController.getUsers);
router.post("/api/user/getUsersByRoles", userController.getUsersByRoles);
router.post(
  "/api/user/updateUserRoleByUserId",
  userController.updateUserRoleByUserId
);
router.post(
  "/api/user/updateUserGroupByUserId",
  userController.updateUserGroupByUserId
);
router.post(
  "/api/user/updateUserRoleByUserIdToNull",
  userController.updateUserRoleByUserIdToNull
);
router.post(
  "/api/user/updateUserGroupByUserIdToNull",
  userController.updateUserGroupByUserIdToNull
);
router.post("/api/user/getNonUsersByRoles", userController.getNonUsersByRoles);
router.post("/api/user/createWorkstation", userController.createWorkstation);
router.post("/api/user/createGroup", userController.createGroup);
router.post("/api/user/createRole", userController.createRole);
router.post(
  "/api/user/retrieveLastWorkstationRecord",
  userController.retrieveLastWorkstationRecord
);
router.post("/api/user/getWorkstations", userController.getWorkstations);

router.post(
  "/api/user/updatePoliceStationByWorkStationId",
  userController.updatePoliceStationByWorkStationId
);

router.post(
  "/api/user/updatePoliceStationByWorkstationIdToNull",
  userController.updatePoliceStationByWorkstationIdToNull
);

router.post(
  "/api/user/getWorkstationsByUserId",
  userController.getWorkstationsByUserId
);

router.post(
  "/api/user/insertWorkStationUserByUserAndWorkStationId",
  userController.insertWorkStationUserByUserAndWorkStationId
);

router.post(
  "/api/user/updateWorkStationUserByUserAndWorkStationIdToNull",
  userController.updateWorkStationUserByUserAndWorkStationIdToNull
);

router.post("/api/user/login", userController.login);

//---------------------------- Retrieve Last User Id ----------------------------
// For Registration

router.post(
  "/api/user/n-users-by-created-date",
  userController.getNUsersByCreatedAtDateController
);

router.post("/api/user/search", userController.searchUsersController);

module.exports = router;
