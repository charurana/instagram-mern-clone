const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const notificationController = require("../controllers/notificationController");

const router = express.Router();

router.get(
    "/notifications",
    isAuthenticated,
    notificationController.getNotifications
);

router.put(
    "/notifications/read",
    isAuthenticated,
    notificationController.markNotificationsRead
);

module.exports = router;