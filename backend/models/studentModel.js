const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./userModel');

const Student = sequelize.define('Student', {
  passport_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
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
},{
    timestamps: false
});

module.exports = Student;
