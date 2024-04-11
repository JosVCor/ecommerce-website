const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// Define routes for notification-related operations
router.post('/', notificationController.createNotification);
router.get('/:userId', notificationController.getUserNotifications);
router.put('/mark-as-read/:notificationId', notificationController.markAsRead);
router.delete('/:notificationId', notificationController.deleteNotification);

module.exports = router;
