const express = require("express");
const poDetailsController = require("../../controllers/po-details/poDetails.controller");
const router = express.Router();

router.post(
  "/api/point-of-sale/po/details",
  poDetailsController.createPoDetailsController
);

//search po number
router.post(
  "/api/point-of-sale/stock/po/ponumber/search",
  poDetailsController.searchPOcontroller
);

//search po by PO NUMBER or date
router.post(
  "/api/point-of-sale/stock/po/searchByNumberORDate",
  poDetailsController.searchPoDetByPoNumberORDate
);

//get supplier
router.get(
  "/api/point-of-sale/po/supplier/:poNumber",
  poDetailsController.getSupplierController
);

module.exports = router;
