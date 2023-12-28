import React from 'react'
import { Link } from 'react-router-dom'

const Review = () => {
    const acceptApplication = () => {
        alert('Application accepted!');
      };
    
      const declineApplication = () => {
        alert('Application declined!');
      };

  return (
    <div className='m-5'>
        <h2 className='text-2xl font-bold mb-2'>Review Application</h2>

        <form className='flex flex-col'>

            <label htmlFor="name">Name:</label>
            <input className='p-2 mb-3 box-border w-full h-8 border border-gray-300 bg-gray-200' type="text" id="name" name="name" value="John" readOnly />

            <label htmlFor="surname">Surname:</label>
            <input className='p-2 mb-3 box-border w-full h-8 border border-gray-300 bg-gray-200' type="text" id="surname" name="surname" value="Doe" readOnly />

            <label htmlFor="nationality">Nationality:</label>
            <input className='p-2 mb-3 box-border w-full h-8 border border-gray-300 bg-gray-200' type="text" id="nationality" name="nationality" value="USA" readOnly />

            <label htmlFor="passportId">Passport ID:</label>
            <input className='p-2 mb-3 box-border w-full h-8 border border-gray-300 bg-gray-200' type="text" id="passportId" name="passportId" value="ABC123456" readOnly />

            <label htmlFor="phoneNumber">Phone Number:</label>
            <input className='p-2 mb-3 box-border w-full h-8 border border-gray-300 bg-gray-200' type="tel" id="phoneNumber" name="phoneNumber" value="123-456-7890" readOnly />

            <label htmlFor="linkedinProfile">LinkedIn Profile:</label>
            <input className='p-2 mb-3 box-border w-full h-8 border border-gray-300 bg-gray-200' type="url" id="linkedinProfile" name="linkedinProfile" value="https://www.linkedin.com/in/johndoe" readonly />

            <label htmlFor="email">Email:</label>
            <input className='p-2 mb-3 box-border w-full h-8 border border-gray-300 bg-gray-200' type="email" id="email" name="email" value="john.doe@example.com" readOnly />

            <label htmlFor="motivationLetter">Motivation Letter:</label>
            <textarea className='p-2 mb-3 box-border w-full h-20 border border-gray-300 bg-gray-200' id="motivationLetter" name="motivationLetter" rows="4" readOnly>This is my motivation letter...</textarea>

            <label htmlFor="resume">Resume:</label>
            <p><Link to="#" className="text-blue-500 hover:underline visited:text-purple-500 visited:hover:underline">Resume.pdf</Link></p>

            <div className='flex flex-row space-x-12'>
                <button className='w-1/2 p-4 text-base border border-gray-500 rounded-md bg-gray-100 hover:bg-gray-200' onClick={acceptApplication}>Accept</button>
                <button className='w-1/2 p-4 text-base border border-gray-500 rounded-md bg-gray-100 hover:bg-gray-200'onClick={declineApplication}>Decline</button>
            </div>

        </form>
    </div>
  )
}

export default Review