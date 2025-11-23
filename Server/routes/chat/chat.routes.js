const express = require("express");
const chatController = require("../../controllers/chat/chat.controller");
const router = express.Router();

router.get("/accessChat", chatController.accessChat);
router.get("/api/getSingleChat/:chatId", chatController.getSingleChat);
router.post("/api/message/set", chatController.addMessage);
router.get("/myChats/:userId", chatController.getMyChats);

module.exports = router;
