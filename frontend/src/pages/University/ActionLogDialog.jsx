import React from 'react';

const ActionLogDialog = ({ logs, onClose }) => {
    const logListStyle = {
        maxHeight: '400px',
        overflowY: 'auto',
        listStyleType: 'none',
        paddingLeft: 0,
        marginTop: '10px'
    };

    const logItemStyle = {
        background: '#f0f0f0',
        margin: '5px 0',
        padding: '10px',
        borderRadius: '5px'
    };

    const closeButtonContainerStyle = {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '10px'
    };

    return (
        <div className='dialog-background'>
            <div className='dialog'>
                <h2>Action Logs</h2>
                {logs.length > 0 ? (
                    <ul style={logListStyle}>
                        {logs.map((log, index) => (
                            <li key={index} style={logItemStyle}>
                                <strong>Time:</strong> {log.timestamp}<br />
                                <strong>Action:</strong> {log.action}<br />
                                <strong>Details:</strong> {JSON.stringify(log.details)}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <em>No action logs available</em>
                    </div>
                )}
                <div style={closeButtonContainerStyle}>
                    <button className="cancel-button" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default ActionLogDialog;
