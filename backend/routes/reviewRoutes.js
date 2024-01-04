const express = require('express');
const multer = require('multer');
const upload = multer();

const messageController = require('../controllers/reviewController');

const router = express.Router();
router.get('/', reviewController.getReviews);

module.exports = router;