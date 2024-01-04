import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";
import axios from 'axios';

const Reviews = ({ universityId }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3000/api/universities/reviews`)
            .then(response => setReviews(response.data))
            .catch(error => console.error('Error fetching data: ', error));
    }, [universityId]);

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
    }

    return (
        <div className='bg-gray-200 h-screen'>
            <Navbar />
            <div className='m-10 bg-white h-3/4 w-11/12 flex flex-col rounded-3xl justify-around items-center'>
                {reviews.map((review, index) => (
                    <div key={index} className='w-3/4 flex flex-col items-center'>
                        <div className='m-5 flex flex-row items-center space-x-7'>
                            <p className='text-3xl text-center'>{review.student.name} from {review.university.name}</p>
                            <div className='flex flex-row'>
                                {renderStars(review.rating)}
                            </div>
                        </div>
                        
                        <p className='text-3xl text-center'>
                            {review.text}
                        </p>

                        <div className='w-3/4 flex justify-end'>
                            <button className=''>Replies</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Reviews;
