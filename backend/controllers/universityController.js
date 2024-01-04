const University = require('../models/universityModel');
const { logAction } = require('../services/universityServices');

exports.getUniversities = async (req, res) => {
    try {
        const universities = await University.findAll();
        res.json(universities);
    } catch (error) {
        res.status(500).send('Error fetching universities');
    }
};

exports.getUniversityById = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const university = await University.findByPk(id);
        if (!university) {
            return res.status(404).send('University not found');
        }
        res.json(university);
    } catch (error) {
        res.status(500).send('Error fetching university');
    }
};

exports.updateUniversity = async (req, res) => {
    const id = parseInt(req.params.id);
    const updatedData = req.body;

    try {
        const university = await University.findByPk(id);
        if (!university) {
            return res.status(404).send('University not found');
        }

        // Determine the changes
        const changes = Object.entries(updatedData).reduce((acc, [key, value]) => {
            if (university[key] !== value) {
                acc[key] = value;
            }
            return acc;
        }, {});

        // Log and update only if there are changes
        if (Object.keys(changes).length > 0) {
            logAction(id, 'Edit', changes);

            // Update the university
            await university.update(changes);
        }

        res.json(university);
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).send('Error updating university');
    }
};

exports.deleteUniversity = async (req, res) => {
    const id_University = parseInt(req.params.id);

    try {
        const deleted = await University.destroy({ where: { id_University } });
        if (!deleted) {
            return res.status(404).send('University not found');
        }
        res.status(204).send();
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(500).send('Error deleting university');
    }
};
