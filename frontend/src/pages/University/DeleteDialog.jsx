import React from 'react';

const DeleteDialog = ({ onClose, onDelete }) => {
    return (
        <div className="dialog-background">
            <div className="dialog">
            <h2>Delete Page</h2>
                <div className="button-container">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={onDelete}>Confirm Delete</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteDialog;
