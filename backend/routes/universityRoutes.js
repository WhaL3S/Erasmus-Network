const express = require('express');
const { fetchCoordinatesFromGoogle } = require('../services/googlePlaces');
const reviewRoutes = require('./reviewRoutes');
const router = express.Router();
const universityController = require('../controllers/universityController');

const universities = [
    { id: 1, name: 'Harvard University', country: 'USA', city: 'Cambridge', address: '123 Tech Street', rating: 4.5 },
    { id: 2, name: 'KTU', country: 'Lithuania', city: 'Kaunas', address: '456 Old Road', rating: 4.2 },
    { id: 3, name: 'University of Waterloo', country: 'Canada', city: 'Waterloo', address: '789 New Way', rating: 4.7 },
    { id: 4, name: 'VU', country: 'Lithuania', city: 'Vilnius', address: 'New road 654', rating: 2.4 },
];

const actionLogs = [];

function logAction(universityId, action, details) {
    if (Object.keys(details).length === 0) {
        return; // No changes, so don't log
    }

    const timestamp = new Date().toISOString();

    // Convert ISO string to a more readable format
    const readableTimestamp = new Date(timestamp).toLocaleString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric', 
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    });

    const formattedDetails = Object.entries(details).map(([key, value]) => `${key}: ${value}`).join(', ');
    const logEntry = `${action} - Changes: { ${formattedDetails} }`;

    actionLogs.push({ universityId, timestamp: readableTimestamp, action, details: logEntry });
    console.log(`Action Logged: ${logEntry}`);
}

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

router.get('/logs/:universityId', (req, res) => {
    const universityId = parseInt(req.params.universityId);
    const filteredLogs = actionLogs.filter(log => log.universityId === universityId);
    res.json(filteredLogs);
});

router.get('/universities', universityController.getUniversities);
router.get('/universities/:id', universityController.getUniversityById);
router.put('/universities/:id', universityController.updateUniversity);
router.delete('/universities/:id', universityController.deleteUniversity);

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
