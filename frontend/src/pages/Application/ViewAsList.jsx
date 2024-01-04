import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import axios from 'axios';

const ViewAsList = () => {
    const [universities, setUniversities] = useState([]);

    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/universities');
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
                {universities.map((university) => (
                    <div key={university.id} className='p-3 mb-3 w-full'>
                        <h2 className='text-2xl font-bold mb-2'>
                            <Link to={`/universities/${university.id}`}>{university.name}</Link>
                        </h2>
                        <p><strong>Location:</strong> {university.location}</p>
                        <p><strong>Rating:</strong> {university.rating}</p>
                        <div className='mt-2'>
                            <Link className='text-xl text-blue-600 hover:text-blue-800' to={`/universities/${university.id}/reviews`}>View Reviews</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );    
}

export default ViewAsList
