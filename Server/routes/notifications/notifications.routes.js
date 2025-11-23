const express = require('express');
const notificationsController = require('../../controllers/notifications/notifications.controller')
const router = express.Router();

router.post('/api/notifications' , notificationsController.getNotificationsByUserAndMobileNumberController)
router.post('/api/notifications/markAsRead' , notificationsController.markNotificationAsReadController)

module.exports = router