import React from 'react'
import Navbar from '../components/Navbar'

const Main = () => {
  return (
    <div className='bg-gray-200 h-screen'>
        <Navbar />
        <div className='m-10 bg-white h-3/4 w-11/12 flex flex-col space-y-5 rounded-3xl' >
            <h1 className='flex p-16 text-6xl justify-center text-center'>Welcome to Erasmus System!</h1>
            <div className='flex justify-center'>
                <p className='text-3xl text-center'>Search University for Erasmus and
                make your experience unforgettable</p>
            </div>
        </div>
    </div>
  )
}

export default Main