import React from 'react'

const Apply = () => {
  return (
    <div className='m-5'>
        <h2 className='text-2xl font-bold mb-2'>Student Application</h2>

        <form className='flex flex-col' action="submit_application.php" method="post" encType="multipart/form-data">

            <label htmlFor="name" className='mb-2'>Name:</label>
            <input className='p-2 mb-3 box-border w-full h-8 border border-gray-300' type="text" id="name" name="name" required />

            <label htmlFor="surname" className='mb-2'>Surname:</label>
            <input className=' p-2 mb-3 box-border w-full h-8 border border-gray-300' type="text" id="surname" name="surname" required />

            <label htmlFor="nationality" className='mb-2'>Nationality:</label>
            <input className='p-2 mb-3 box-border w-full h-8 border border-gray-300' type="text" id="nationality" name="nationality" required />

            <label htmlFor="passportId" className='mb-2'>Passport ID:</label>
            <input className='p-2 mb-3 box-border w-full h-8 border border-gray-300' type="text" id="passportId" name="passportId" required />

            <label htmlFor="phoneNumber" className='mb-2'>Phone Number:</label>
            <input className='p-2 mb-3 box-border w-full h-8 border border-gray-300' type="tel" id="phoneNumber" name="phoneNumber" required />

            <label htmlFor="linkedinProfile" className='mb-2'>LinkedIn Profile:</label>
            <input className='p-2 mb-3 box-border w-full h-8 border border-gray-300' type="url" id="linkedinProfile" name="linkedinProfile" placeholder="https://www.linkedin.com/in/yourprofile" required />

            <label htmlFor="email" className='mb-2'>Email:</label>
            <input className='p-2 mb-3 box-border w-full h-8 border border-gray-300' type="email" id="email" name="email" required />

            <label htmlFor="motivationLetter" className='mb-2'>Motivation Letter:</label>
            <textarea className='p-2 mb-3 box-border w-full h-20 border border-gray-300' id="motivationLetter" name="motivationLetter" rows="4" required></textarea>

            <label htmlFor="resume" className='mb-2'>Attach Resume:</label>
            <input className='p-2 mb-3 box-border w-full' type="file" id="resume" name="resume" accept=".pdf, .doc, .docx" required />

            <button className='w-48 p-4 text-base border border-gray-500 rounded-md bg-gray-100 hover:bg-gray-200' type="submit">Submit Application</button>

        </form>
    </div>
  )
}

export default Apply