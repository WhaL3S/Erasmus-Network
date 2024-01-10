import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Reviews = () => {
    const [editingReview, setEditingReview] = useState(null); // State to track the editing review
    const [reviews, setReviews] = useState([]);
    const [filter, setFilter] = useState({
        rating: '',
        userName: '', // Filter by user's name
        reviewText: '' // Filter by review text
    });
    const [newReview, setNewReview] = useState({
        text: '',
        rating: '',
        fkStudentidUser: '', // Input by user
        fkUniversityidUniversity: '' // Input by user
    });

    const { universityId } = useParams();
    const handleReviewChange = (e) => {
        setNewReview({ ...newReview, [e.target.name]: e.target.value });
    };
    const submitReview = async () => {
        // Add validation as needed
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/universities/${universityId}/reviews`, newReview);
            // Handle the successful response, e.g., updating the list of reviews
            console.log(response.data);
        } catch (error) {
            console.error('Error adding review: ', error);
        }
    };
    useEffect(() => {
        const fetchReviews = async () => {
            const queryParams = new URLSearchParams(filter);

            try {
                const url = `${process.env.REACT_APP_API_URL}/api/universities/${universityId}/reviews?${queryParams}`;
                const response = await axios.get(url);
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews: ', error);
            }
        };

        fetchReviews();
    }, [universityId, filter]);

    const EditReviewModal = ({ review, onSave, onClose }) => {
        const [newText, setNewText] = useState(review.text);

        const handleSave = () => {
            onSave(review.idReview, newText);
        };

        return (
            <div className="edit-modal">
                <textarea
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                />
                <button onClick={handleSave}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        );
    };
    const handleEdit = (review) => {
        setEditingReview(review);
    };

    const handleSaveEdit = async (id, newText) => {
        // Call API to update the review
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/api/universities/${universityId}/reviews/${id}`, { text: newText });
            setEditingReview(null);
            // Re-fetch reviews to update the list
            fetchReviews();
        } catch (error) {
            console.error('Error updating review: ', error);
        }
    };
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/api/universities/${universityId}/reviews/${id}`);
                // Re-fetch or update state to reflect the deleted review
                setReviews(reviews.filter(review => review.idReview !== id));
            } catch (error) {
                console.error('Error deleting review: ', error);
            }
        }
    };
    const handleCloseEdit = () => {
        setEditingReview(null);
    };
    const renderStars = (rating) => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                stars.push(<IoStar key={i} />);
            } else if (i === Math.floor(rating) && !Number.isInteger(rating)) {
                stars.push(<IoStarHalf key={i} />);
            } else {
                stars.push(<IoStarOutline key={i} />);
            }
        }
        return stars;
    };

    const handleFilterChange = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
    };

    return (
        <div className='bg-gray-200 h-screen'>
            <Navbar />
            <div className='filter-form'>
                <input
                    name="rating"
                    placeholder="Rating"
                    value={filter.rating}
                    onChange={handleFilterChange}
                />
                <input
                    name="userName"
                    placeholder="User Name"
                    value={filter.userName}
                    onChange={handleFilterChange}
                />
                <input
                    name="reviewText"
                    placeholder="Review Text"
                    value={filter.reviewText}
                    onChange={handleFilterChange}
                />
                <button onClick={() => setFilter({ rating: '', userName: '', reviewText: '' })}>
                    Clear Filters
                </button>
            </div>
            <div>
                <input
                    type="text"
                    name="text"
                    value={newReview.text}
                    onChange={handleReviewChange}
                    placeholder="Review text"
                />
                <input
                    type="number"
                    name="rating"
                    value={newReview.rating}
                    onChange={handleReviewChange}
                    placeholder="Rating"
                    min="1"
                    max="5"
                />
                <input
                    type="text"
                    name="fkStudentidUser"
                    value={newReview.fkStudentidUser}
                    onChange={handleReviewChange}
                    placeholder="Student ID"
                />
                <input
                    type="text"
                    name="fkUniversityidUniversity"
                    value={newReview.fkUniversityidUniversity}
                    onChange={handleReviewChange}
                    placeholder="University ID"
                />
                <button onClick={submitReview}>Add Review</button>
            </div>
            <div className='m-10 bg-white h-3/4 w-11/12 flex flex-col rounded-3xl justify-around items-center'>
                {reviews.map((review) => (
                    <div key={review.idReview} className='w-3/4 flex flex-col items-center'>
                        <div className='m-5 flex flex-row items-center space-x-7'>
                            <p className='text-3xl text-center'>
                                {review.student && review.student.user ? `${review.student.user.name} ${review.student.user.surname} ` : 'Unknown'}
                                from {review.university.name}
                            </p>
                            <div className='flex flex-row'>
                                {renderStars(review.rating)}
                            </div>
                        </div>

                        <p className='text-3xl text-center'>
                            {review.text}
                        </p>

                        <div className='w-3/4 flex justify-end'>
                            <button onClick={() => handleEdit(review)}>Edit</button>
                            <button onClick={() => handleDelete(review.idReview)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {editingReview && (
                <EditReviewModal
                    review={editingReview}
                    onSave={handleSaveEdit}
                    onClose={handleCloseEdit}
                />
            )}
        </div>
    );
}

export default Reviews;
