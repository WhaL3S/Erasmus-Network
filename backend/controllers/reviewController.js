const { Review } = require('../models'); // Adjust the path as per your project structure

const getReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getReviews
};