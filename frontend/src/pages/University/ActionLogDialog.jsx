import React from 'react';

const ActionLogDialog = ({ logs, onClose }) => {
    return (
        <div className='dialog-background'>
            <div className='dialog'>
                <button onClick={onClose}>Close</button>
                <h2>Action Logs</h2>
                <ul>
                    {logs.map((log, index) => (
                        <li key={index}>{`${log.timestamp} - ${log.action} - Details: ${JSON.stringify(log.details)}`}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ActionLogDialog;
