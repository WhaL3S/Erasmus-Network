import React, { useState } from 'react';

const EditDialog = ({ university, onClose, onSave }) => {
    const [name, setName] = useState(university.name);
    const [country, setCountry] = useState(university.country);
    const [city, setCity] = useState(university.city);
    const [address, setAddress] = useState(university.address);
    const [rating, setRating] = useState(university.rating);
    const [error, setError] = useState('');

    const handleSubmit = () => {
        // Reset error
        setError('');

        // Check if any field is empty
        if (!name.trim() || !country.trim() || !city.trim() || !address.trim() || rating === null) {
            setError('All fields must be filled');
            return;
        }

        // Prepare the updated university object
        const updatedUniversity = {
            ...university,
            name,
            country,
            city,
            address,
            rating
        };

        onSave(updatedUniversity);
    };

    return (
        <div className="dialog-background">
            <div className="dialog">
                <h2>Edit Page</h2>
                {error && <p className="error-message">{error}</p>}
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
                <input type="text" value={country} onChange={e => setCountry(e.target.value)} placeholder="Country" />
                <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="City" />
                <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" />
                <input type="number" value={rating} onChange={e => setRating(parseFloat(e.target.value))} placeholder="Rating" min="0" max="5" step="0.1" />
                <div className="button-container">
                    <button className="confirm-button" onClick={handleSubmit}>Save</button>
                    <button className="cancel-button" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default EditDialog;
