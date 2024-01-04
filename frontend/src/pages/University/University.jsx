import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';

import EditDialog from './EditDialog';
import UploadDialog from './UploadDialog';
import DeleteDialog from './DeleteDialog';

import './DialogStyles.css';

const University = () => {
    const [university, setUniversity] = useState({});
    const { universityId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUniversity = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/universities/${universityId}`);
                setUniversity(response.data);
            } catch (error) {
                console.error('Error fetching university details', error);
            }
        };

        fetchUniversity();
    }, [universityId]);

    /* DIALOG LOGIC */
    const [isEditDialogOpen, setEditDialogOpen] = useState(false);
    const [isUploadDialogOpen, setUploadDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    
    const openEditDialog = () => setEditDialogOpen(true);
    const closeEditDialog = () => setEditDialogOpen(false);
    
    const openUploadDialog = () => setUploadDialogOpen(true);
    const closeUploadDialog = () => setUploadDialogOpen(false);
    
    const openDeleteDialog = () => setDeleteDialogOpen(true);
    const closeDeleteDialog = () => setDeleteDialogOpen(false);
    
    const handleDelete = () => {
        // Perform delete operation here
        navigate('/universities');
    };
    /* DIALOG LOGIC */

    if (!university) {
        return <div>Loading...</div>;
    }

    return (
        <div className='bg-gray-200 h-screen'>
            <Navbar />
            <div className='m-10 bg-white h-3/4 w-11/12 flex flex-col rounded-3xl justify-around items-center' >
                <div className='w-full m-5 flex flex-row justify-around'>
                    <p className='text-3xl text-center'>{university.name}</p>
                </div>

                <div className='w-full m-5 flex flex-row justify-around'>
                    <p className='text-3xl text-center'>{university.city}, {university.country}</p>
                </div>

                <div className='w-full m-5 flex flex-row justify-around'>
                    <p className='text-3xl text-center'>{university.address}</p>
                </div>

                <div className='w-full m-5 flex flex-row justify-around'>
                    <p className='text-3xl text-center'>Rating: {university.rating}</p>
                </div>

                {/* Links and Dialogs */}
                <Link className='text-2xl text-center' to='/apply'>Apply</Link>
                <Link className='text-2xl text-center' to={`/universities/${universityId}/reviews`}>Reviews</Link>
                <Link className='text-2xl text-center border-2 p-2' to={`/universities/${universityId}/action-log`}>Action Log</Link>

                {/* DIALOGS */}
                <button onClick={openEditDialog}>Edit Page</button>
                <button onClick={openUploadDialog}>Upload Files</button>
                <button onClick={openDeleteDialog}>Delete Page</button>

                {/* Render dialogs conditionally */}
                {isEditDialogOpen && (
                <EditDialog onClose={closeEditDialog} />
                )}
                {isUploadDialogOpen && (
                <UploadDialog onClose={closeUploadDialog} />
                )}
                {isDeleteDialogOpen && (
                <DeleteDialog onClose={closeDeleteDialog} onDelete={handleDelete} />
                )}
                {/* DIALOGS */}
            </div>
        </div>
    )
}

export default University;
