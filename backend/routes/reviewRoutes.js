const express = require('express');
const multer = require('multer');
const upload = multer();

const reviewController = require('../controllers/reviewController');

const router = express.Router();
router.get('/', reviewController.getReviewsForUniversity);
module.exports = router;