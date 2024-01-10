const { Review, University, Student, User } = require('../models');

const getReviewsForUniversity = async (req, res) => {
    try {
        const universityId = req.params.universityId;
        const { rating, userName, reviewText } = req.query;

        let whereClause = { fkUniversityidUniversity: universityId };
        let userWhereClause = {};
        let reviewWhereClause = {};

        if (rating) {
            whereClause.rating = rating;
        }

        if (userName) {
            // Assuming 'name' is the field in User model
            userWhereClause.name = { [sequelize.Op.like]: `%${userName}%` };
        }

        if (reviewText) {
            reviewWhereClause.text = { [sequelize.Op.like]: `%${reviewText}%` };
        }

        // Fetch reviews with or without filters
        const reviews = await Review.findAll({
            where: reviewWhereClause,
            include: [
                { model: University, as: 'university' },
                {
                    model: Student, 
                    as: 'student',
                    include: [{ 
                        model: User, 
                        as: 'user',
                        where: userWhereClause,
                        required: !!userName // Apply this only if userName filter is used
                    }]
                }
            ]
        });

        res.json(reviews);
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).send('Error fetching reviews for university');
    }
};

const addReview = async (req, res) => {
    try {
        const { text, rating, fkStudentidUser, fkUniversityidUniversity } = req.body;
        const newReview = await Review.create({ text, rating, fkStudentidUser, fkUniversityidUniversity });
        res.status(201).json(newReview);
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(400).send('Error adding review');
    }
};

const editReview = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { text, rating } = req.body;
        const review = await Review.findByPk(id);

        if (!review) {
            return res.status(404).send('Review not found');
        }

        await review.update({ text, rating });
        res.json(review);
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(400).send('Error editing review');
    }
};

const getFilteredReviews = async (req, res) => {
    try {
        const { rating, universityId } = req.query;
        const whereClause = {};
        if (rating) whereClause.rating = rating;
        if (universityId) whereClause.fkUniversityidUniversity = universityId;

        const reviews = await Review.findAll({ 
            where: whereClause,
            include: [{ model: University, as: 'university' }]
        });
        res.json(reviews);  // Simplified response
    } catch (error) {
        console.log(`Error: ${error}`);  // Log the error
        res.status(400).send('Error fetching filtered reviews');  // Send a custom error message
    }
};

module.exports = {
    getReviewsForUniversity,
    addReview,
    editReview,
    getFilteredReviews
};
