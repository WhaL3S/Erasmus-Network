const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./userModel');

const Representator = sequelize.define('Representator', {
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  linkedin: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  id_user: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    references: {
        model: User,
        key: 'id_user',
      },
  },
  id_university: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    references: {
        model: University,
        key: 'id_university',
      },
  },
},{
    timestamps: false
});

module.exports = Representator;
