const express = require('express');
const reviewController = require('../controllers/reviewController');

const router = express.Router({ mergeParams: true });

// Adjusted routes
router.get('/', reviewController.getReviewsForUniversity);
router.post('/', reviewController.addReview);
router.put('/:reviewId', reviewController.editReview); // Use 'reviewId' for clarity

module.exports = router;
