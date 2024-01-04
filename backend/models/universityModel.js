const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const University = sequelize.define('University', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rating: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
    id_University: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
}, {
    tableName: 'University',
    timestamps: false
});

module.exports = University;
