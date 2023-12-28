import React from 'react'
import Navbar from '../../components/Navbar'
import { IoStar, IoStarHalf, IoStarOutline  } from "react-icons/io5";

const Reviews = () => {
    return (
        <div className='bg-gray-200 h-screen'>
            <Navbar />
            <div className='m-10 bg-white h-3/4 w-11/12 flex flex-col rounded-3xl justify-around items-center' >
                <div className='w-3/4 flex flex-col items-center'>
                    <div className='m-5 flex flex-row items-center space-x-7'>
                        <p className='text-3xl text-center'>Person 1</p>
                        <div className='flex flex-row'>
                            <IoStar />
                            <IoStar />
                            <IoStar />
                            <IoStarHalf />
                            <IoStarOutline />
                        </div>
                    </div>
                    
                    <p className='text-3xl text-center'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Omnis pariatur amet aperiam debitis. 
                        Quo inventore enim placeat natus doloremque sint 
                        velit cum maxime facilis iste. 
                        Commodi sint magni dolores aperiam!
                    </p>

                    <div className='w-3/4 flex justify-end'>
                        <button className=''>Replies</button>
                    </div>
                </div>

                <div className='w-3/4 flex flex-col items-center'>
                    <div className='m-5 flex flex-row items-center space-x-7'>
                        <p className='text-3xl text-center'>Person 2</p>
                        <div className='flex flex-row'>
                            <IoStar />
                            <IoStar />
                            <IoStar />
                            <IoStar />
                            <IoStarHalf />
                        </div>
                    </div>

                    <p className='text-3xl text-center'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Omnis pariatur amet aperiam debitis. 
                        Quo inventore enim placeat natus doloremque sint 
                        velit cum maxime facilis iste. 
                        Commodi sint magni dolores aperiam!
                    </p>

                    <div className='w-3/4 flex justify-end'>
                        <button className=''>Replies</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reviews