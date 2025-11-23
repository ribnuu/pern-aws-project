const express = require("express");
const router = express.Router();

const posItemInformationController = require("../../controllers/pos-item-information/posItemInformationController.controller");

//serach Items by user
router.post(
  "/api/point-of-sales/item/search",
  posItemInformationController.SearchItemController
);

//New route for adding the item information
router.post(
  "/api/point-of-sales/iteminfo",
  posItemInformationController.createItemInformationController
);

module.exports = router;
