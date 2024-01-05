const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Chat = sequelize.define('Chat', {
  id_Chat: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
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
  fk_Userid_User2: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'fk_Userid_User2',
    references: {
      model: 'User',
      key: 'id_User',
    },
  },
}, {
  timestamps: false,
  tableName: 'Chat', 
});

module.exports = Chat;