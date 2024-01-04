const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./userModel');

const Representator = sequelize.define('Representator', {
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
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
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
    references: {
        model: University,
        key: 'id_university',
      },
  },
},{
    timestamps: false
});

module.exports = Representator;
