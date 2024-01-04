const { Review, User, University } = require('../models');

const getReviewsForUniversity = async (req, res) => {
    try {
        const universityId = req.params.universityId;
        const reviews = await Review.findAll({
            where: { fk_Universityid_University: universityId },
            include: ['student', 'university']
        });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addReview = async (req, res) => {
    try {
        const { text, rating, userId, universityId } = req.body;
        const newReview = await Review.create({ text, rating, userId, universityId });
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const editReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { text, rating } = req.body;
        const review = await Review.findByPk(id);
        if (review) {
            review.text = text;
            review.rating = rating;
            await review.save();
            res.status(200).json(review);
        } else {
            res.status(404).send('Review not found');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getFilteredReviews = async (req, res) => {
    try {
        const { rating, universityId, userId } = req.query;
        let whereClause = {};
        if (rating) whereClause.rating = rating;
        if (universityId) whereClause.fkUniversityidUniversity = universityId;
        if (userId) whereClause.fkStudentidUser = userId;

        const reviews = await Review.findAll({ 
            where: whereClause,
            include: [{ model: User, as: 'user' }, { model: University, as: 'university' }]
        });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getReviewsForUniversity,
    addReview,
    editReview,
    getFilteredReviews
};
