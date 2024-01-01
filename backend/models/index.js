// models/index.js

const User = require('./userModel');
const Chat = require('./chatModel');
const Message = require('./messageModel');

// Define associations
User.hasMany(Message, { foreignKey: 'sender', as: 'sentMessages' });
Message.belongsTo(User, { as: 'senderDetails', foreignKey: 'sender' });

Chat.belongsTo(User, { as: 'user1Details', foreignKey: 'user1' });
Chat.belongsTo(User, { as: 'user2Details', foreignKey: 'user2' });
Chat.hasMany(Message, { as: 'messages', foreignKey: 'chatId' });
Message.belongsTo(Chat, { as: 'messageDetails', foreignKey: 'chatId' });


module.exports = {
  User,
  Chat,
  Message,
};
