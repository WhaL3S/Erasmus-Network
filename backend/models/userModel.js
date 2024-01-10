const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const User = sequelize.define('User', {
  // Assuming 'name' and 'surname' are also fields in your User table
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_User: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // If this field is auto-incremented in your database
  },
}, {
  timestamps: false,
  tableName: 'User' // Specify the table name if it's different from the model name
});

module.exports = User;
