import React from 'react';

const EditDialog = ({ onClose }) => {
  return (
    <div className="dialog-background">
      <div className="dialog">
        <h2>Edit Page</h2>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditDialog;
