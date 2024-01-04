import React, { useState } from 'react';

const FilterForm = ({ onApplyFilter }) => {
    const [rating, setRating] = useState('');
    const [universityId, setUniversityId] = useState('');
    const [userId, setUserId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onApplyFilter({ rating, universityId, userId });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Rating:</label>
                <input
                    type="number"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                />
            </div>
            <div>
                <label>University ID:</label>
                <input
                    type="text"
                    value={universityId}
                    onChange={(e) => setUniversityId(e.target.value)}
                />
            </div>
            <div>
                <label>User ID:</label>
                <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
            </div>
            <button type="submit">Apply Filter</button>
        </form>
    );
};

export default FilterForm;
