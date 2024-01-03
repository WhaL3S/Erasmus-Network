import React from 'react';
import { Link } from 'react-router-dom';

import GeoChart from '../../components/GeoChart';

const ViewOnMap = () => {
    const universities = [
        { name: 'University 1', country: 'USA', city: 'Washington' },
        { name: 'University 2', country: 'Lithuania', city: 'Kaunas' },
        // ... other universities
    ];

    return (
        <div className='m-5'>
            <GeoChart universities={universities} />

            <div className='border border-solid border-gray-300 p-3 mb-3'>
                <h2 className='text-2xl font-bold mb-2'><Link to='/universities/university'>University 1</Link></h2>
                <p><strong>Location:</strong> City A</p>
                <p><strong>Rating:</strong> 4.5</p>
                <p><strong>Faculty Names:</strong> Engineering, Science</p>
            </div>

            <div className='border border-solid border-gray-300 p-3 mb-3'>
                <h2 className='text-2xl font-bold mb-2'><Link to='/universities/university'>University 2</Link></h2>
                <p><strong>Location:</strong> City B</p>
                <p><strong>Rating:</strong> 4.0</p>
                <p><strong>Faculty Names:</strong> Arts, Business</p>
            </div>
        </div>
    )
}

export default ViewOnMap
