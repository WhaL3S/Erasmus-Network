import React from 'react'
import Navbar from '../../components/Navbar'
import { useNavigate, Link } from 'react-router-dom'
import profile from '../../assets/images/blank_profile.png'

const Profile = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/guest');
      };
      const handleApplications = () => {
        navigate('/view-applications');
      };

    const buttonStyle = 'mt-5 w-48 h-8 border border-black rounded-3xl bg-gray-200';

    return (
        <div className='bg-gray-200 h-screen'>
            <Navbar />
            <div className='m-10 bg-white h-3/4 w-11/12 flex flex-row rounded-3xl justify-around items-center' >
                <div className='flex-1 flex flex-col items-center'>
                    <img className='w-48 h-48' src={profile} alt="Profile" />
                    <button className={buttonStyle} onClick={handleApplications}>Applications</button>
                    <button className={buttonStyle}>Edit</button>
                    <button className={buttonStyle} onClick={handleLogout}>Logout</button>
                </div>
                <div className='flex-1 space-y-5 text-center text-xl'>
                    <div>
                        <label htmlFor="name" className='font-bold'>Name</label>
                        <p>Some name</p>
                    </div>

                    <div>
                        <label htmlFor="surname" className='font-bold'>Surname</label>
                        <p>Some surname</p>
                    </div>
                    
                    <div>
                        <label htmlFor="university" className='font-bold'>University</label>
                        <p>Some uni</p>
                    </div>

                    <div>
                        <label htmlFor="email" className='font-bold'>Email</label>
                        <p>some.email@mail.com</p>
                    </div>
                    
                    <div>
                        <label htmlFor="passport" className='font-bold'>Passport Id</label>
                        <p>Some passport id</p>
                    </div>

                    <div>
                        <label htmlFor="LinkedIn" className='font-bold'>LinkedIn profile</label>
                        <p><Link to="#" className='text-blue-500 hover:underline visited:text-purple-500 visited:hover:underline'>Some link to profile</Link></p>
                    </div>    
                </div>
            </div>   
        </div>
    )
}

export default Profile