const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./userModel');
const Chat = require('./chatModel');

const Message = sequelize.define('Message', {
  sender: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  attachment: {
    type: DataTypes.STRING, 
    allowNull: true,
  },
  chatId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Chat,
      key: 'id',
    },
  },
},{
    timestamps: false
});

module.exports = Message;
