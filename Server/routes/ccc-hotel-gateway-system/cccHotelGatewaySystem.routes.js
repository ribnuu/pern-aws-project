const express = require("express");
const cccHotelGatewaySystemController = require("../../controllers/ccc-hotel-gateway-system/cccHotelGatewaySystem.controller");
const router = express.Router();

router.post(
  "/api/ccc/hotel-gateway-system/ccc-hotels",
  cccHotelGatewaySystemController.createHotelController
);

// GET endpoint to fetch all the customer institutions in the company
router.get(
  "/api/ccc/hotel-gateway-system/ccc-hotels",
  cccHotelGatewaySystemController.getAllHotelsController
);

router.get(
  "/api/ccc/hotel-gateway-system/ccc-hotels/:id",
  cccHotelGatewaySystemController.getHotelByIdController
);

router.put(
  "/api/ccc/hotel-gateway-system/ccc-hotels/:id",
  cccHotelGatewaySystemController.updateHotelByIdController
);

module.exports = router;
