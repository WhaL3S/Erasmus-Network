const express = require('express');
const registrationController = require('../controllers/registrationController');
const router = express.Router();

// Routes
router.post('/guest/registration', registrationController.registerUser);


module.exports = router;