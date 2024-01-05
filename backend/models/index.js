// models/index.js

const User = require('./userModel');
const Chat = require('./chatModel');
const Message = require('./messageModel');
const Student = require('./studentModel'); // Make sure you have this model
const University = require('./universityModel');
const Review = require('./reviewModel');  // Import the Review model
const LogUniversity =  require('./logUniversityModel');
// Define associations
Review.belongsTo(Student, { foreignKey: 'fkStudentidUser', as: 'student' });
Review.belongsTo(University, { foreignKey: 'fkUniversityidUniversity', as: 'university' });
//Review.belongsTo(User, { foreignKey: 'fkStudentidUser', as: 'user' });
Message.belongsTo(Chat, { foreignKey: 'fk_Chatid_Chat', as: 'chat' });
Chat.belongsTo(User, { foreignKey: 'fk_Userid_User' });
Chat.belongsTo(User, { foreignKey: 'fk_Userid_User2' });
Chat.hasMany(Message, { foreignKey: 'fk_Chatid_Chat', as: 'messages' });

University.hasMany(LogUniversity, {
  foreignKey: 'universityId',
  onDelete: 'CASCADE'
});
LogUniversity.belongsTo(University, {
  foreignKey: 'universityId'
});

module.exports = {
  User,
  Chat,
  Message,
  Review,
  University,
  Student,
  LogUniversity
};
