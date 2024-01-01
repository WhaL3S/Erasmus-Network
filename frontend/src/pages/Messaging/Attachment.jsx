import React from 'react';
import { useNavigate } from 'react-router-dom';

const Attachment = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className='bg-gray-200 h-screen pt-10'>
      <div className='mx-10 mb-10 bg-white h-5/6 w-11/12 flex flex-col space-y-5 rounded-3xl justify-center items-center'>
        <h1 className='flex p-16 text-6xl justify-center text-center'>Attachment</h1>
        <input
          className='p-2 mb-3 box-border w-full'
          type="file"
          id="attachment"
          name="attachment"
          accept=".pdf, .doc, .docx"
        />
        <button className='mt-5 w-48 h-8 border border-black rounded-3xl bg-gray-200' onClick={handleBack}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Attachment;