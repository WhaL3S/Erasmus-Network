import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Edit = () => {
  const [name, setName] = useState('John');
  const [surname, setSurname] = useState('Doe');
  const [nationality, setNationality] = useState('USA');
  const [passportId, setPassportId] = useState('ABC123456');
  const [phoneNumber, setPhoneNumber] = useState('123-456-7890');
  const [linkedinProfile, setLinkedinProfile] = useState('https://www.linkedin.com/in/johndoe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [motivationLetter, setMotivationLetter] = useState('This is my motivation letter...');

  const handleCancel = () => {
    alert('Edit canceled!');
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    alert('Changes saved!');
  };

  return (
    <div className='m-5'>
      <h2 className='text-2xl font-bold mb-2'>Edit Application</h2>

      <form className='flex flex-col' onSubmit={handleSaveChanges}>

        <label htmlFor="name" className='mb-2'>Name:</label>
        <input
          className='p-2 mb-3 box-border w-full h-8 border border-gray-300'
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="surname" className='mb-2'>Surname:</label>
        <input
          className='p-2 mb-3 box-border w-full h-8 border border-gray-300'
          type="text"
          id="surname"
          name="surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
        />

        <label htmlFor="nationality" className='mb-2'>Nationality:</label>
        <input
          className='p-2 mb-3 box-border w-full h-8 border border-gray-300'
          type="text"
          id="nationality"
          name="nationality"
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
          required
        />

        <label htmlFor="passportId" className='mb-2'>Passport ID:</label>
        <input
          className='p-2 mb-3 box-border w-full h-8 border border-gray-300'
          type="text"
          id="passportId"
          name="passportId"
          value={passportId}
          onChange={(e) => setPassportId(e.target.value)}
          required
        />

        <label htmlFor="phoneNumber" className='mb-2'>Phone Number:</label>
        <input
          className='p-2 mb-3 box-border w-full h-8 border border-gray-300'
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />

        <label htmlFor="linkedinProfile" className='mb-2'>LinkedIn Profile:</label>
        <input
          className='p-2 mb-3 box-border w-full h-8 border border-gray-300'
          type="url"
          id="linkedinProfile"
          name="linkedinProfile"
          value={linkedinProfile}
          onChange={(e) => setLinkedinProfile(e.target.value)}
          required
        />

        <label htmlFor="email" className='mb-2'>Email:</label>
        <input
          className='p-2 mb-3 box-border w-full h-8 border border-gray-300'
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="motivationLetter" className='mb-2'>Motivation Letter:</label>
        <textarea
          className='p-2 mb-3 box-border w-full h-20 border border-gray-300'
          id="motivationLetter"
          name="motivationLetter"
          rows="4"
          value={motivationLetter}
          onChange={(e) => setMotivationLetter(e.target.value)}
          required
        />

        <label htmlFor="resume" className='mb-2'>Attach Resume:</label>
        <p>Previous Resume: <Link to="#" className="text-blue-500 hover:underline visited:text-purple-500 visited:hover:underline">Resume.pdf</Link></p>
        <input
          className='p-2 mb-3 box-border w-full'
          type="file"
          id="resume"
          name="resume"
          accept=".pdf, .doc, .docx"
        />

        <div className='flex flex-row space-x-1'>
          <button
            className='w-36 p-4 text-base border border-gray-500 rounded-md bg-gray-100 hover:bg-gray-200'
            type="submit"
          >
            Save Changes
          </button>
          <button
            className='w-24 p-4 text-base border border-gray-500 rounded-md bg-gray-100 hover:bg-gray-200'
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
};

export default Edit;
