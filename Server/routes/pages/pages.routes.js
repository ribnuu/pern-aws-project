const express = require("express");
const pagesController = require("../../controllers/pages/pages.controller");
const router = express.Router();

router.get(
  "/api/pages/getPagesByGroupId/:groupId",
  pagesController.getPagesByGroupId
);

router.post("/api/pages/getComponents", pagesController.getComponents);
router.post("/api/pages/getSubComponents", pagesController.getSubComponents);
router.post("/api/pages/getButtons", pagesController.getButtons);
router.post(
  "/api/pages/retrieveLastComponentId",
  pagesController.retrieveLastComponentId
);

router.post(
  "/api/pages/retrieveLastComponentId",
  pagesController.retrieveLastComponentId
);

router.post(
  "/api/pages/retrieveLastButtonId",
  pagesController.retrieveLastButtonId
);

router.post("/api/pages/createComponent", pagesController.createComponent);
router.post("/api/pages/createButton", pagesController.createButton);

module.exports = router;
