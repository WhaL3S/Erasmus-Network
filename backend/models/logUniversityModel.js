// logUniversityModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const LogUniversity = sequelize.define('LogUniversity', {
    universityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'University',
            key: 'id_University'
        }
    },
    action: {
        type: DataTypes.STRING,
        allowNull: false
    },
    details: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'LogUniversity',
    timestamps: false
});

module.exports = LogUniversity;
