import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import axios from 'axios';

const ViewAsList = () => {
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

    const listStyle = {
        maxHeight: '600px',
        overflowY: 'auto',
        width: '100%',
        padding: '10px',
    };

    const universityStyle = {
        background: '#f0f0f0',
        borderRadius: '10px',
        padding: '15px',
        margin: '10px 0',
    };

    return (
        <div className='bg-gray-200 h-screen'>
            <Navbar />
            <div className='m-10 bg-white h-3/4 w-11/12 flex flex-col rounded-3xl justify-around items-center'>
                <div style={listStyle}>
                    {universities.map((university) => (
                        <div key={university.id_University} style={universityStyle}>
                            <h2 className='text-2xl font-bold mb-2'>
                                <Link to={`/universities/${university.id_University}`}>{university.name}</Link>
                            </h2>
                            <p><strong>Location:</strong> {university.city}, {university.country}</p>
                            <p><strong>Rating:</strong> {university.rating}</p>
                            <div className='mt-2'>
                                <Link className='text-xl text-blue-600 hover:text-blue-800' to={`/universities/${university.id_University}/reviews`}>View Reviews</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );    
}

export default ViewAsList;
