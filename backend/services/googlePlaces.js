const axios = require('axios');

async function fetchCoordinatesFromGoogle(city, country) {
    console.log("Fetching");
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(city + ' ' + country)}&inputtype=textquery&fields=geometry&key=${apiKey}`;
    
    try {
        const response = await axios.get(url);
        console.log("API Response:", response.data);

        if (response.data && response.data.candidates && response.data.candidates.length > 0) {
            const location = response.data.candidates[0].geometry.location;
            console.log(`Location found: ${JSON.stringify(location)}`);
            return location;
        } else {
            throw new Error('No location found');
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        throw error; // Rethrow the error if you want to handle it in the calling function
    }
}

module.exports = { fetchCoordinatesFromGoogle };
