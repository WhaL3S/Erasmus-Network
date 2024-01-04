const express = require('express');
const loginController = require('../controllers/loginController');
const router = express.Router();

// Routes
router.get('/guest/login', loginController.loginUser);


module.exports = router;