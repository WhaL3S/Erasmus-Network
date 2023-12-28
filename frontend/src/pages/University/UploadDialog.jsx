import React from 'react';

const UploadDialog = ({ onClose }) => {
  return (
    <div className="dialog-background">
      <div className="dialog">
        <h2>Upload Files</h2>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default UploadDialog;
