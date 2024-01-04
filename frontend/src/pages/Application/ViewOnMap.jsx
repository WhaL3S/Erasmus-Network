import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';

import GeoChart from '../../components/GeoChart';

const ViewOnMap = () => {
    const universities = [
        { id: 1, name: 'University 1', country: 'USA', city: 'Washington' },
        { id: 2, name: 'KTU', country: 'Lithuania', city: 'Kaunas' },
        { id: 3, name: 'VU', country: 'Lithuania', city: 'Vilnius' },
        { id: 4, name: 'University 4', country: 'Germany', city: 'Berlin' },
        // ... other universities
    ];

    return (
        <div className='bg-gray-200 h-screen'>
            <Navbar />
            <div className='m-10 bg-white h-3/4 w-11/12 flex flex-col rounded-3xl justify-around items-center'>
                <GeoChart universities={universities} />
            </div>
        </div>
    )
}

export default ViewOnMap
