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

    const buttonStyle = {
        color: 'white',
        padding: '10px 20px',
        margin: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    const buttonContainerStyle = {
        textAlign: 'center',
        margin: '20px 0',
    };

    const infoTextStyle = {
        fontSize: '1.5rem',
        marginBottom: '10px',
    };

    /* DIALOG LOGIC */

    if (!university) {
        return <div>Loading...</div>;
    }

    return (
        <div className='bg-gray-200 h-screen'>
            <Navbar />
            <div className='m-10 bg-white h-3/4 w-11/12 flex flex-col rounded-3xl justify-around items-center' >
                <div style={infoTextStyle}><strong>Name:</strong> {university.name}</div>
                <div style={infoTextStyle}><strong>Location:</strong> {university.city}, {university.country}</div>
                <div style={infoTextStyle}><strong>Address:</strong> {university.address}</div>
                <div style={infoTextStyle}><strong>Rating:</strong> {university.rating}</div>

                <div style={buttonContainerStyle}>
                    <Link className='link-button' to='/apply'>Apply</Link>
                    <Link className='link-button' to={`/universities/${universityId}/reviews`}>Reviews</Link>
                    <button className="open-button" style={buttonStyle} onClick={openActionLogDialog}>View Action Log</button>
                    <button className="open-button" style={buttonStyle} onClick={openEditDialog}>Edit Page</button>
                    <button className="open-button" style={buttonStyle} onClick={openDeleteDialog}>Delete Page</button>
                </div>

                {/* Dialogs */}
                {isActionLogDialogOpen && <ActionLogDialog logs={actionLogs} onClose={closeActionLogDialog} />}
                {isEditDialogOpen && <EditDialog university={university} onClose={closeEditDialog} onSave={handleSave} />}
                {isDeleteDialogOpen && <DeleteDialog universityId={universityId} onClose={closeDeleteDialog} onDelete={handleDelete} />}
            </div>
        </div>
    );
}

export default University;
