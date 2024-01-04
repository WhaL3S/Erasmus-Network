const express = require('express');
const { fetchCoordinatesFromGoogle } = require('../services/googlePlaces');
const reviewRoutes = require('./reviewRoutes');
const router = express.Router();

const universities = [
    { id: 1, name: 'Tech University', country: 'USA', city: 'Techville', address: '123 Tech Street', rating: 4.5 },
    { id: 2, name: 'Historic College', country: 'UK', city: 'Historytown', address: '456 Old Road', rating: 4.2 },
    { id: 3, name: 'Future University', country: 'Canada', city: 'Innovate City', address: '789 New Way', rating: 4.7 },
];

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
    res.json(universities);
});

router.get('/universities/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const university = universities.find(u => u.id === id);

    if (!university) {
        return res.status(404).send('University not found');
    }

    res.json(university);
});

router.put('/universities/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const updatedData = req.body;
    
    const universityIndex = universities.findIndex(u => u.id === id);
    if (universityIndex === -1) {
        return res.status(404).send('University not found');
    }

    universities[universityIndex] = { ...universities[universityIndex], ...updatedData };
    res.json(universities[universityIndex]);
});

router.delete('/universities/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const universityIndex = universities.findIndex(u => u.id === id);
    
    if (universityIndex === -1) {
        return res.status(404).send('University not found');
    }

    universities.splice(universityIndex, 1);
    res.status(204).send();
});

module.exports = router;
