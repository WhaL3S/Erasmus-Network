const LogUniversity = require('../models/logUniversityModel');

function logAction(universityId, action, details) {
    if (Object.keys(details).length === 0) {
        return; // No changes, so don't log
    }

    const timestamp = new Date();

    // Create a formatted details string
    const formattedDetails = Object.entries(details)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');

    LogUniversity.create({
        universityId,
        action,
        details: formattedDetails,
        timestamp
    }).then(() => {
        console.log(`Action Logged: ${action} - ${formattedDetails}`);
    }).catch(err => {
        console.error('Error logging action:', err);
    });
}

async function getUniversityLogs(universityId) {
    try {
        const logs = await LogUniversity.findAll({
            where: {
                universityId: universityId
            },
            order: [['timestamp', 'DESC']]
        });
        return logs;
    } catch (error) {
        console.error('Error fetching logs:', error);
        throw error; // Rethrow the error so it can be handled by the caller
    }
}

module.exports = {
    logAction,
    getUniversityLogs
};
