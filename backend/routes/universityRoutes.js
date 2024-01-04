const express = require('express');
const { fetchCoordinatesFromGoogle } = require('../services/googlePlaces');
const reviewRoutes = require('./reviewRoutes');
const router = express.Router();
const universityController = require('../controllers/universityController');
const { getUniversityLogs } = require('../services/universityServices');

// uni reviews - Tomas
router.use('/universities/:universityId/reviews', reviewRoutes);

// Routes
router.get('/coordinates', async (req, res) => {
    const { city, country } = req.query;

    if (!city || !country) {
        return res.status(400).send('City and country are required');
    }

    try {
        const coordinates = await fetchCoordinatesFromGoogle(city, country);
        res.json(coordinates);
    } catch (error) {
        res.status(500).send('Error fetching coordinates');
    }
});

router.get('/logs/:universityId', async (req, res) => {
    const universityId = parseInt(req.params.universityId);

    try {
        const logs = await getUniversityLogs(universityId);
        res.json(logs);
    } catch (error) {
        res.status(500).send('Error fetching logs');
    }
});

router.get('/universities', universityController.getUniversities);
router.get('/universities/:id', universityController.getUniversityById);
router.put('/universities/:id', universityController.updateUniversity);
router.delete('/universities/:id', universityController.deleteUniversity);

module.exports = router;
