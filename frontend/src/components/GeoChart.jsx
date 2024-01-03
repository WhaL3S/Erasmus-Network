import React, { Component, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import markerIconUrl from 'leaflet/dist/images/marker-icon.png';
import markerShadowUrl from 'leaflet/dist/images/marker-shadow.png';

import ReactDOMServer from 'react-dom/server';
import countryBoundaries from '../assets/world-administrative-boundaries.json';
import { GeoJSON } from 'react-leaflet';

const UniversityPopupContent = ({ university }) => {
    return (
        <div className='border border-solid border-gray-300 p-3 mb-3'>
            <h2 className='text-2xl font-bold mb-2'>
            <a href={`/universities/${university.id}`}>{university.name}</a>
            </h2>
            <div>
                    {university.city}, {university.country}
            </div>
        </div>
    );
};

function MarkerCluster({ universityData }) {
    const map = useMap();

    useEffect(() => {
        const markerClusterGroup = L.markerClusterGroup();
        
        // Define a new default icon
        const defaultIcon = L.icon({
            iconUrl: markerIconUrl,
            shadowUrl: markerShadowUrl,
            iconSize: [25, 41], // size of the icon
            iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
            popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
            shadowSize: [41, 41]
        });

        universityData.forEach(uni => {
            const popupContent = ReactDOMServer.renderToString(
                <UniversityPopupContent university={uni} />
            );
        
            const marker = L.marker([uni.lat, uni.lng], { icon: defaultIcon })
                .bindPopup(popupContent);
            markerClusterGroup.addLayer(marker);
        });

        map.addLayer(markerClusterGroup);

        return () => {
            map.removeLayer(markerClusterGroup);
        };
    }, [universityData, map]);

    return null;
}

class GeoChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            universityData: [],
            loading: true,
        };
    }

    // Function to check if a country has a university and return a color
    getCountryStyle = (feature) => {
        const hasUni = this.state.universityData.some(uni => 
            uni.country === feature.properties.name || uni.country === feature.properties.iso3
        );
        console.log(`Property ${feature.properties.name}, Country ${hasUni}`);
        return {
            fillColor: hasUni ? this.getRandomColor() : '#FFFFFF', // Fill color is random if there's a uni, otherwise white
            weight: 1,
            opacity: 1,
            color: 'black',
            fillOpacity: hasUni ? 0.4 : 0.2 // Less opacity if no university
        };
    };

    // Function to generate a random color
    getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    componentDidMount() {
        this.fetchAllUniversityData();
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
                id: university.id,
                name: university.name,
                city,
                country
            }; // Return the data with university details
        } catch (error) {
            console.error('Fetch error:', error);
            return null; // Return null in case of error
        }
    };

    fetchAllUniversityData = async () => {
        const universities = this.props.universities;
        const promises = universities.map(uni => this.fetchCoordinates(uni));
        const results = await Promise.all(promises);
        const validUniversityData = results.filter(data => data != null); // Filter out null values
        this.setState({ universityData: validUniversityData, loading: false });
    }

    renderMap() {
        if (this.state.loading) {
            return <div>Loading...</div>; // Show loading message
        }

        return (
            <MapContainer 
                center={[0, 0]} 
                zoom={2} 
                style={{ height: '500px', width: '800px' }} 
                maxZoom={19}
                maxBounds={[
                    [-90, -180], // South West coordinates
                    [90, 180]    // North East coordinates
                ]}
                maxBoundsViscosity={0.6} // Optional: makes it harder to pan outside the bounds
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />
                <MarkerCluster universityData={this.state.universityData} />
                <GeoJSON
                    data={countryBoundaries}
                    style={this.getCountryStyle}
                />
            </MapContainer>
        );
    }

    render() {
        return (
            <div>
                {this.renderMap()}
            </div>
        );
    }
}

export default GeoChart;
