const express = require('express');
const messageController = require('../controllers/messageController');

const router = express.Router();

// Routes
router.post('/chats', messageController.createChat);
router.get('/users/:userId/chats', messageController.getChatsByUserId);
router.get('/chats/:chatId/messages', messageController.getMessagesByChatId);
router.post('/chats/:chatId/messages', messageController.sendMessage);
router.put('/messages/:messageId', messageController.editMessage);
router.delete('/messages/:messageId', messageController.deleteMessage);


module.exports = router;
