import React from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate('/');
    };

    const buttonStyle = 'mt-5 w-48 h-8 border border-black rounded-3xl bg-gray-200';

    return (
        <div className='bg-gray-200 h-screen pt-10'>
            <div className='mx-10 mb-10 bg-white h-5/6 w-11/12 flex flex-col space-y-5 rounded-3xl' >
                <h1 className='flex p-16 text-6xl justify-center text-center'>Welcome to Erasmus System!</h1>
                <div className='flex justify-center flex-col text-center'>
                    <form className='flex flex-col text-center items-center' action="#">
                        <label htmlFor="login">Login</label>
                        <input className='m-2 h-8 border border-black w-48 rounded-md' type="text" id="login"/>

                        <label className='mt-2' htmlFor="password">Password</label>
                        <input className='m-2 h-8 border border-black w-48 rounded-md' type="password" id="password"/>

                        <button className={buttonStyle} onClick={handleSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login