module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Student', {
        passportId: {
            type: DataTypes.STRING,
            field: 'passport_id'
        },
        phoneNumber: {
            type: DataTypes.STRING,
            field: 'phone_number'
        },
        linkedinProfile: {
            type: DataTypes.STRING,
            field: 'linkedin_profile'
        },
        idUser: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            field: 'id_User'
        }
    }, {
        tableName: 'Student',
        timestamps: false // assuming your table doesn't have timestamps like createdAt or updatedAt
    });

    Student.associate = function(models) {
        // Assuming you have a User model and it's related to Student
        Student.belongsTo(models.User, {
            foreignKey: 'idUser',
            as: 'user'
        });

        // If there are other associations, define them here
    };

    return Student;
};
