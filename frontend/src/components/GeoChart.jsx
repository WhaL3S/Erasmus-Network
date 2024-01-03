import React, { Component } from 'react';

class GeoChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coordinates: [], // This will hold coordinates for multiple universities
        };
    }

    componentDidMount() {
        this.loadGoogleCharts();
    }

    fetchCoordinates = async (university) => {
        try {
            const { city, country } = university;
            const response = await fetch(`http://localhost:3001/api/coordinates?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return {
                ...data, // latitude and longitude
                name: university.name,
                city,
                country
            }; // Return the data with university details
        } catch (error) {
            console.error('Fetch error:', error);
            return null; // Return null in case of error
        }
    };

    fetchAllCoordinates = async () => {
        const universities = this.props.universities;
        const promises = universities.map(uni => this.fetchCoordinates(uni));
        const results = await Promise.all(promises);
        const validCoordinates = results.filter(coord => coord != null); // Filter out null values
        this.setState({ coordinates: validCoordinates }, () => {
            // Reinitialize the chart after state update
            this.initGeoChart();
        });
    }

    loadGoogleCharts() {
        const existingScript = document.getElementById('googleChartsScript');
        
        const onScriptLoad = () => {
            this.fetchAllCoordinates(); // Fetch coordinates after the script is loaded
        };
    
        if (!existingScript) {
            const script = document.createElement('script');
            script.src = 'https://www.gstatic.com/charts/loader.js';
            script.id = 'googleChartsScript';
            document.body.appendChild(script);
    
            script.onload = onScriptLoad; // Set the callback for onload
        } else if (window.google) {
            onScriptLoad(); // If the script is already loaded, call the callback directly
        }
    }

    initGeoChart() {
        const { coordinates } = this.state;

        window.google.charts.load('current', {
            packages: ['geochart'],
            mapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
        });

        window.google.charts.setOnLoadCallback(() => {
            const data = new window.google.visualization.DataTable();
            data.addColumn('number', 'Lat');
            data.addColumn('number', 'Long');
            data.addColumn({'type': 'string',  'role': 'tooltip', 'p': {'html': true}});
    
            coordinates.forEach(coord => {
                let tooltipContent = `University: ${coord.name}<br>City: ${coord.city}<br>Country: ${coord.country}`;
                data.addRow([coord.lat, coord.lng, tooltipContent]);
            });

            const options = {
                region: 'world',
                displayMode: 'markers',
                colorAxis: { colors: ['green', 'blue'] },
                resolution: 'countries',
                tooltip: { isHtml: true } // Enable HTML content in tooltips
            };
            
            const chart = new window.google.visualization.GeoChart(document.getElementById('geoChart'));
            chart.draw(data, options);
        });
    }

    render() {
        return (
            <div id="geoChart" style={{ height: '500px', width: '800px' }}></div>
        );
    }
}

export default GeoChart;
