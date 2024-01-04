// models/review.js
module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('Review', {
        text: DataTypes.STRING,
        timeCreated: DataTypes.DATE,
        rating: DataTypes.INTEGER,
        id_review: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        fk_Studentid_User: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fk_Universityid_University: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'review'
    });

    Review.associate = function(models) {
        Review.belongsTo(models.Student, {
            foreignKey: 'fk_Studentid_User',
            as: 'student'
        });

        Review.belongsTo(models.University, {
            foreignKey: 'fk_Universityid_University',
            as: 'university'
        });
    };

    return Review;
};
