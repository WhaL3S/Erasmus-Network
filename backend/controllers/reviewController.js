const { Review } = require('../models');

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

module.exports = {
    getReviewsForUniversity
};
