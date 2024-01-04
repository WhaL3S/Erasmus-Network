import React from 'react';
import Navbar from '../../components/Navbar';
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

const Reviews = () => {
    // Hardcoded sample reviews
    const reviews = [
        {
            text: "Great environment and professors. Highly recommend!",
            rating: 4.5,
            student: { name: "Alex" },
            university: { name: "Global Tech University" }
        },
        {
            text: "Amazing experience, learned a lot.",
            rating: 5,
            student: { name: "Jordan" },
            university: { name: "Historic Arts College" }
        },
        {
            text: "Good course material, but found the environment competitive.",
            rating: 3.5,
            student: { name: "Taylor" },
            university: { name: "Future Science Institute" }
        }
    ];

    const renderStars = (rating) => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < Math.floor(rating)) {
                stars.push(<IoStar key={i} />);
            } else if (i === Math.floor(rating) && rating % 1 !== 0) {
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
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Reviews;
