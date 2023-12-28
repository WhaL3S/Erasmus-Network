import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const Universities = () => {
  return (
      <div className='bg-gray-200 h-screen'>
        <Navbar />
        <div className='m-10 bg-white h-3/4 w-11/12 flex flex-col rounded-3xl justify-around items-center' >
          <div className='w-full m-5 flex flex-row justify-around'>
              <p className='text-3xl text-center'><Link to='/universities/university'>Uni 1</Link></p>
              <Link className='text-2xl text-center' to='/universities/reviews'>Reviews</Link>
          </div>

          <div className='w-full m-5 flex flex-row justify-around'>
              <p className='text-3xl text-center'><Link to='/universities/university'>Uni 2</Link></p>
              <Link className='text-2xl text-center' to='/universities/reviews'>Reviews</Link>
          </div>

          <div className='w-full m-5 flex flex-row justify-around'>
              <p className='text-3xl text-center'><Link to='/universities/university'>Uni 3</Link></p>
              <Link className='text-2xl text-center' to='/universities/reviews'>Reviews</Link>
          </div>
        </div>
      </div>
  )
}

export default Universities