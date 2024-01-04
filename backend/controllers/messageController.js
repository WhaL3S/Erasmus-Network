const { Chat, Message } = require('../models');
const { Op } = require('sequelize');

const createChat = async (req, res) => {
  const { user1, user2 } = req.body;

  try {
    const newChat = await Chat.create({ user1, user2 });
    res.json(newChat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getChatsByUserId = async (req, res) => {
  const userId = parseInt(req.params.userId, 10);

  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID.' });
  }

  try {
    const userChats = await Chat.findAll({
      where: { [Op.or]: [{ user1: userId }, { user2: userId }] },
      include: [{ model: Message, as: 'messages' }],
      timestamps: false,
    });

    res.json(userChats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getMessagesByChatId = async (req, res) => {
  const chatId = parseInt(req.params.chatId, 10);

  if (isNaN(chatId)) {
    return res.status(400).json({ error: 'Invalid chat ID.' });
  }

  try {
    const messages = await Message.findAll({
      where: { chatId },
    });

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const sendMessage = async (req, res) => {
  const text = req.body.text;
  const attachmentName = req.body.attachmentName;
  const attachment = req.file;
  const chatId = parseInt(req.params.chatId, 10);
  const senderId = 1;

  if (isNaN(chatId) || !senderId) {
    return res.status(400).json({ error: 'Invalid chat ID or sender ID.' });
  }

  try {
    const base64Attachment = attachment.buffer.toString('base64');

    const newMessage = await Message.create({
      text,
      attachment: base64Attachment,
      attachmentName,
      chatId,
      sender: senderId,
    });

    res.json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const editMessage = async (req, res) => {
  const messageId = parseInt(req.params.messageId, 10);
  const { text, attachment } = req.body;

  if (isNaN(messageId)) {
    return res.status(400).json({ error: 'Invalid message ID or text.' });
  }

  try {
    const updatedMessage = await Message.update({ text, attachment }, { where: { id: messageId } });
    res.json(updatedMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteMessage = async (req, res) => {
  const messageId = parseInt(req.params.messageId, 10);
  const senderId = 1;

  if (isNaN(messageId) || isNaN(senderId)) {
    return res.status(400).json({ error: 'Invalid message ID or sender ID.' });
  }

  try {
    const message = await Message.findByPk(messageId);

    if (!message || message.sender !== senderId) {
      return res.status(403).json({ error: 'You are not authorized to delete this message.' });
    }

    await Message.destroy({ where: { id: messageId } });

    res.json({ success: true, message: 'Message deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createChat,
  getChatsByUserId,
  getMessagesByChatId,
  sendMessage,
  editMessage,
  deleteMessage
};
