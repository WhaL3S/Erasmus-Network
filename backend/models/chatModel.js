const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Chat = sequelize.define('Chat', {
  user1: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user2: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
},{
    timestamps: false
});

module.exports = Chat;