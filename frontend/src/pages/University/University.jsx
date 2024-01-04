import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';

import EditDialog from './EditDialog';
import DeleteDialog from './DeleteDialog';
import ActionLogDialog from './ActionLogDialog';

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
    const openEditDialog = () => setEditDialogOpen(true);
    const closeEditDialog = () => setEditDialogOpen(false);

    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const openDeleteDialog = () => setDeleteDialogOpen(true);
    const closeDeleteDialog = () => setDeleteDialogOpen(false);

    const [isActionLogDialogOpen, setActionLogDialogOpen] = useState(false);
    const [actionLogs, setActionLogs] = useState([]);
    const openActionLogDialog = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/logs/${universityId}`);
            setActionLogs(response.data);
            setActionLogDialogOpen(true);
        } catch (error) {
            console.error('Error fetching action logs', error);
        }
    };
    const closeActionLogDialog = () => setActionLogDialogOpen(false);

    const handleDelete = () => {
        axios.delete(`http://localhost:3001/api/universities/${universityId}`)
            .then(response => {
                // Handle the successful deletion
                navigate('/universities');
            })
            .catch(error => {
                // Handle any errors here
                console.error('Error deleting university', error);
            });
    };

    const handleSave = (updatedUniversity) => {
        axios.put(`http://localhost:3001/api/universities/${updatedUniversity.id}`, updatedUniversity)
            .then(response => {
                setUniversity(response.data);
                closeEditDialog();
            })
            .catch(error => {
                console.error('Error updating university', error);
            });
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

                {/* DIALOGS */}
                <button onClick={openActionLogDialog}>View Action Log</button>
                {isActionLogDialogOpen && (
                    <ActionLogDialog
                        logs={actionLogs}
                        onClose={closeActionLogDialog}
                    />
                )}


                <button onClick={openEditDialog}>Edit Page</button>
                {isEditDialogOpen && (
                    <EditDialog
                        university={university}
                        onClose={closeEditDialog}
                        onSave={handleSave}
                    />
                )}

                <button onClick={openDeleteDialog}>Delete Page</button>
                {isDeleteDialogOpen && (
                    <DeleteDialog universityId={universityId} onClose={closeDeleteDialog} onDelete={handleDelete} />
                )}
                {/* DIALOGS */}
            </div>
        </div>
    )
}

export default University;
