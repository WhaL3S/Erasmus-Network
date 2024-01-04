const express = require('express');
const reviewController = require('../controllers/reviewController');

const router = express.Router({ mergeParams: true }); // to access params from the parent router
router.get('/', reviewController.getReviewsForUniversity);

module.exports = router;
