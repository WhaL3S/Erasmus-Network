const express = require('express');
const profileController = require('../controllers/profileController');
const router = express.Router();

// Routes
router.get('/profile', profileController.openProfile);


module.exports = router;