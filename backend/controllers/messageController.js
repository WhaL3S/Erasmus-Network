const { Chat, Message } = require('../models');
const { Op, Sequelize } = require('sequelize');

const createChat = async (req, res) => {
  const { fk_Userid_User, fk_Userid_User2 } = req.body;

  try {
    const newChat = await Chat.create({
      fk_Userid_User,
      fk_Userid_User2,
    });

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
      where: {
        [Op.or]: [
          { fk_Userid_User: userId },
          { fk_Userid_User2: userId },
        ],
      },
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
      where: { fk_Chatid_Chat: chatId }, // Adjust to match the foreign key in the Message model
    });

    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const sendMessage = async (req, res) => {
  const text = req.body.text;
  let attachmentName = req.body.attachmentName;
  const attachment = req.file;
  const chatId = parseInt(req.params.chatId, 10);
  const userId = req.body.userId; // Assuming senderId is hard-coded for demonstration

  if (isNaN(chatId) || isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid chat ID or sender ID.' });
  }

  try {
    let base64Attachment = null;

    if (attachmentName === "undefined") {
      attachmentName = null;
    }

    if (attachment !== undefined) {
      base64Attachment = attachment.buffer.toString('base64');
    }

    const newMessage = await Message.create({
      text,
      attachment: base64Attachment,
      attachmentName,
      fk_Chatid_Chat: chatId,
      fk_Userid_User: userId,
      timeSent: Sequelize.literal('CURRENT_DATE'),
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
    const updatedMessage = await Message.update(
      { text, attachment },
      { where: { id_Message: messageId } } 
    );

    res.json(updatedMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteMessage = async (req, res) => {
  const messageId = parseInt(req.params.messageId, 10);

  if (isNaN(messageId)) {
    return res.status(400).json({ error: 'Invalid message ID or sender ID.' });
  }

  try {
    const message = await Message.findByPk(messageId);

    if (!message) {
      return res
        .status(404)
        .json({ error: 'No such message found.' });
    }

    await Message.destroy({ where: { id_Message: messageId } });

    res.json({
      success: true,
      message: 'Message deleted successfully.',
    });
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
  deleteMessage,
};
