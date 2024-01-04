const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Student = sequelize.define('Student', {
    passportId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'passport_id'
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'phone_number'
    },
    linkedinProfile: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'linkedin_profile'
    },
    idUser: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: 'id_User'
    }
}, {
    tableName: 'Student',
    timestamps: false  // Assuming your table doesn't have timestamps
});

// Export the model
module.exports = Student;
