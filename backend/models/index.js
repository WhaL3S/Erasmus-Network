// models/index.js

const User = require('./userModel');
const Chat = require('./chatModel');
const Message = require('./messageModel');
const Student = require('./studentModel'); // Make sure you have this model
const University = require('./universityModel');
const Review = require('./reviewModel');  // Import the Review model
// Define associations
User.hasMany(Message, { foreignKey: 'sender', as: 'sentMessages' });
Message.belongsTo(User, { as: 'senderDetails', foreignKey: 'sender' });
// Define associations for Review
//Review.belongsTo(Student, { foreignKey: 'fkStudentidUser', as: 'student' });
//Review.belongsTo(University, { foreignKey: 'fkUniversityidUniversity', as: 'university' });

Chat.belongsTo(User, { as: 'user1Details', foreignKey: 'user1' });
Chat.belongsTo(User, { as: 'user2Details', foreignKey: 'user2' });
Chat.hasMany(Message, { as: 'messages', foreignKey: 'chatId' });
Message.belongsTo(Chat, { as: 'messageDetails', foreignKey: 'chatId' });


module.exports = {
  User,
  Chat,
  Message,
  Review,
  University,
  Student
};
