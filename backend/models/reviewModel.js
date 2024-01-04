module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('Review', {
        text: DataTypes.STRING,
        timeCreated: DataTypes.DATE,
        rating: DataTypes.INTEGER,
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
        tableName: 'Review'
    });

    Review.associate = function(models) {
        Review.belongsTo(models.Student, {
            foreignKey: 'fkStudentidUser',
            as: 'student'
        });
        Review.belongsTo(models.University, {
            foreignKey: 'fkUniversityidUniversity',
            as: 'university'
        });
    };

    return Review;
};
