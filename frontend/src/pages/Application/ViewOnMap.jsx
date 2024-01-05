import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import axios from 'axios';

import GeoChart from '../../components/GeoChart';

const ViewOnMap = () => {
    const [universities, setUniversities] = useState([]);

    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/universities`);
                setUniversities(response.data);
            } catch (error) {
                console.error('Error fetching universities', error);
            }
        };

        fetchUniversities();
    }, []);

    return (
        <div className='bg-gray-200 h-screen'>
            <Navbar />
            <div className='m-10 bg-white h-3/4 w-11/12 flex flex-col rounded-3xl justify-around items-center'>
                {universities.length > 0 ? 
                    <GeoChart universities={universities} /> :
                    <div>Loading Map...</div>}
            </div>
        </div>
    );
}

export default ViewOnMap
