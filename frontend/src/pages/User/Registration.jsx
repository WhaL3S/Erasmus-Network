import React from 'react'
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
      navigate('/guest/registration/confirm-registration');
  };

  const buttonStyle = 'mt-5 w-48 h-8 border border-black rounded-3xl bg-gray-200';

  return (
      <div className='bg-gray-200 h-full py-10 '>
          <div className='mx-10 mb-10 bg-white h-5/6 w-11/12 flex flex-col space-y-5 rounded-3xl' >
              <h1 className='flex p-16 text-6xl justify-center text-center'>Welcome to Erasmus System!</h1>
              <div className='pb-12 flex justify-center flex-col text-center'>
                  <form className='flex flex-col text-center items-center' action="#">
                    <label htmlFor="name">Name</label>
                    <input className='m-2 h-8 border border-black w-48 rounded-md' type="text" id="name"/>

                    <label className='mt-2' htmlFor="surname">Surname</label>
                    <input className='m-2 h-8 border border-black w-48 rounded-md' type="text" id="surname"/>

                    <label htmlFor="university">University</label>
                    <input className='m-2 h-8 border border-black w-48 rounded-md' type="text" id="university"/>

                    <label className='mt-2' htmlFor="email">Email</label>
                    <input className='m-2 h-8 border border-black w-48 rounded-md' type="email" id="email"/>
                    
                    <label htmlFor="login">Login</label>
                    <input className='m-2 h-8 border border-black w-48 rounded-md' type="text" id="login"/>

                    <label className='mt-2' htmlFor="password">Password</label>
                    <input className='m-2 h-8 border border-black w-48 rounded-md' type="password" id="password"/>
                    
                    <div className='flex flex-col text-center items-center'>
                      <div className='m-5'>
                        <input type="radio" name='user_type' id="student"/>
                        <label className='ml-2' htmlFor="student">I am student</label>
                      </div>

                      <label htmlFor="passport">Passport</label>
                      <input className='m-2 h-8 border border-black w-48 rounded-md' type="text" id="passport"/>

                      <label className='mt-2' htmlFor="phone">Phone</label>
                      <input className='m-2 h-8 border border-black w-48 rounded-md' type="text" id="phone"/>
                    </div>

                    <div className='flex flex-col text-center items-center'>
                      <div className='m-5'>
                        <input type="radio" name='user_type' id="representator"/>
                        <label className='ml-2' htmlFor="representator">I am representing university</label>
                      </div>

                      <label htmlFor="position">Position</label>
                      <input className='m-2 h-8 border border-black w-48 rounded-md' type="text" id="position"/>

                      <label className='mt-2' htmlFor="department">Department</label>
                      <input className='m-2 h-8 border border-black w-48 rounded-md' type="text" id="department"/>
                    </div>
                    
                    <button className={buttonStyle} onClick={handleSubmit}>Submit</button>
                  </form>
              </div>
          </div>
      </div>
  )
}

export default Registration