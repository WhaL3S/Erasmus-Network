const { Review, University, Student, User } = require('../models');
const getReviewsForUniversity = async (req, res) => {
    try {
        const universityId = req.params.universityId;
        const { rating, userName, reviewText } = req.query;

        // Fetch reviews without filters for userName and reviewText
        const reviews = await Review.findAll({
            where: { fkUniversityidUniversity: universityId, ...(rating && { rating }) },
            include: [
                { model: University, as: 'university' },
                {
                    model: Student,
                    as: 'student',
                    include: {
                        model: User,
                        as: 'user',
                        attributes: { exclude: ['password'] },
                    }
                }
            ]
        });

        // Filter the results based on userName and reviewText
        const filteredReviews = reviews.filter(review => {
            const userFullName = `${review.student.user.name} ${review.student.user.surname}`;
            return (!userName || userFullName.toLowerCase().includes(userName.toLowerCase())) &&
                   (!reviewText || review.text.toLowerCase().includes(reviewText.toLowerCase()));
        });

        res.json(filteredReviews);
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).send('Error fetching reviews for university');
    }
};

const addReview = async (req, res) => {
    try {
        const { text, rating, fkStudentidUser, fkUniversityidUniversity } = req.body;
        const currentDate = new Date().toISOString().split('T')[0];
        const newReview = await Review.create({ text, rating, fkStudentidUser, fkUniversityidUniversity, timeCreated: currentDate });
        res.status(201).json(newReview);
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(400).send('Error adding review');
    }
};

const editReview = async (req, res) => {
    try {
        const id = parseInt(req.params.reviewId);
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
const deleteReview = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        // Validate the review ID
        if (isNaN(id)) {
            return res.status(400).send('Invalid review ID');
        }

        // Find the review by ID
        const review = await Review.findByPk(id);
        if (!review) {
            return res.status(404).send('Review not found');
        }

        // Delete the review
        await review.destroy();
        res.status(200).send(`Review with ID ${id} successfully deleted`);
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).send('Error deleting review');
    }
};
module.exports = {
    getReviewsForUniversity,
    addReview,
    editReview,
    deleteReview,
};
