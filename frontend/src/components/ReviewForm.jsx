import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ reviewData, onSuccess }) => {
    const [text, setText] = useState(reviewData ? reviewData.text : '');
    const [rating, setRating] = useState(reviewData ? reviewData.rating : 5);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = reviewData ? `/reviews/${reviewData.id}` : '/reviews';
        const method = reviewData ? 'put' : 'post';
        try {
            const response = await axios[method]('http://localhost:3001/api' + endpoint, { text, rating });
            onSuccess(response.data);
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea value={text} onChange={(e) => setText(e.target.value)} />
            <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} />
            <button type="submit">Submit</button>
        </form>
    );
};

export default ReviewForm;
