const express = require('express');
const { newMessage, getMessages } = require('../controllers/messageController');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router(); // ✅ FIX

router.post("/newMessage", isAuthenticated, newMessage);
router.get("/messages/:chatId", isAuthenticated, getMessages);

module.exports = router;