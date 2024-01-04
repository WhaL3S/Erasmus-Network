const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Review = sequelize.define('Review', {
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    timeCreated: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'timeCreated'
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idReview: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_Review'
    },
    fkStudentidUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'fk_Studentid_User'
    },
    fkUniversityidUniversity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'fk_Universityid_University'
    }
}, {
    tableName: 'Review',
    timestamps: false
});

module.exports = Review;
