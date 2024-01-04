const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./userModel');

const Student = sequelize.define('Student', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: User,
      key: 'username',
    },
  },
  usersurname: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: User,
      key: 'usersurname',
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    references: {
      model: User,
      key: 'email',
    },
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    references: {
      model: User,
      key: 'login',
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: User,
      key: 'password',
    },
  },
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
