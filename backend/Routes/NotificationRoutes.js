const express = require('express');
const router = express.Router();
const notificationController = require('../Controllers/NotificationController');

router.get('/:organizerId', notificationController.getOrganizerNotifications);
router.put('/read/:notificationId', notificationController.markAsRead);
router.put('/read-all/:organizerId', notificationController.markAllAsRead);
router.delete('/:notificationId', notificationController.deleteNotification);

module.exports = router;
