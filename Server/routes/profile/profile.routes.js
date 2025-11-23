const express = require("express");
const profileControlller = require("../../controllers/profile/profile.controller");

const router = express.Router();

router.get("/api/profile/:userId", profileControlller.getUserData);
router.post("/api/profile/update", profileControlller.updateUserData);
router.post(
  "/api/profile/update/language",
  profileControlller.updateUserAppLanguage
);

module.exports = router;
