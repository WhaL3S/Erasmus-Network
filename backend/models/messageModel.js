const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Message = sequelize.define('Message', {
  id_Message: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  attachment: {
    type: DataTypes.BLOB,
    allowNull: true,
  },
  attachmentName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  timeSent: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  fk_Chatid_Chat: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'fk_Chatid_Chat', 
    references: {
      model: 'Chat',
      key: 'id_Chat',
    },
  },
  fk_Userid_User: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'fk_Userid_User', 
    references: {
      model: 'User',
      key: 'id_User',
    },
  },
}, {
  timestamps: false,
  tableName: 'Message',
});


module.exports = Message;
