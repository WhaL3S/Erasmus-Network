import React from 'react'
import { useNavigate } from 'react-router-dom';

const Guest = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/guest/login');
    };
    const handleRegistration = () => {
        navigate('/guest/registration');
    };

    const buttonStyle = 'mt-5 w-48 h-8 border border-black rounded-3xl bg-gray-200';

    return (
        <div className='bg-gray-200 h-screen pt-10'>
            <div className='mx-10 mb-10 bg-white h-5/6 w-11/12 flex flex-col space-y-5 rounded-3xl' >
                <h1 className='flex p-16 text-6xl justify-center text-center'>Welcome to Erasmus System!</h1>
                <div className='flex justify-center flex-col text-center'>
                    <div className='m-5'>
                        <p className='text-3xl text-center'>Please login to continue</p>
                        <button className={buttonStyle} onClick={handleLogin}>Login</button>
                    </div>

                    <div className='m-5'>
                        <p className='text-3xl text-center'>Don't have account?</p>
                        <button className={buttonStyle} onClick={handleRegistration}>Register</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Guest