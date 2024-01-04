import React from 'react';

const DeleteDialog = ({ onClose, onDelete }) => {
    return (
        <div className="dialog-background">
            <div className="dialog">
            <h2>Delete Page</h2>
                <div className="button-container">
                    <button className="confirm-button" onClick={onDelete}>Confirm Delete</button>
                    <button className="cancel-button" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteDialog;
