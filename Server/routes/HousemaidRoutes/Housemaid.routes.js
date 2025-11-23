const express = require("express");
const Housemaidcontroller = require("../../controllers/Housemaid/Housemaid.controller");
const router = express.Router();

//Housemaid Registration controller
router.post(
  "/api/Housemaid/CreateHousemaid",
  Housemaidcontroller.CreateHousemaid
);

//Housemaid View Controller
router.post("/api/Housemaid/ViewHousemaid", Housemaidcontroller.ViewHousemaid);

module.exports = router;
