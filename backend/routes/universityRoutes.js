const express = require('express');
const { fetchCoordinatesFromGoogle } = require('../services/googlePlaces');
const reviewRoutes = require('./reviewRoutes');
const router = express.Router();
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

router.get('/universities', async (req, res) => {
    // Fetch your university data from a database or other source
    const universities = [
        { id: 1, name: 'Tech University', country: 'USA', city: 'Techville', address: '123 Tech Street', rating: 4.5 },
        { id: 2, name: 'Historic College', country: 'UK', city: 'Historytown', address: '456 Old Road', rating: 4.2 },
        { id: 3, name: 'Future University', country: 'Canada', city: 'Innovate City', address: '789 New Way', rating: 4.7 },
    ];
    
    res.json(universities);
});

module.exports = router;
