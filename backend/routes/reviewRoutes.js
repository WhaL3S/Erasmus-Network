const express = require('express');
const reviewController = require('../controllers/reviewController');

const router = express.Router({ mergeParams: true }); // to access params from the parent router
// Existing routes
router.get('/', reviewController.getReviewsForUniversity);
router.post('/', reviewController.addReview);
router.put('/:id', reviewController.editReview);
module.exports = router;
