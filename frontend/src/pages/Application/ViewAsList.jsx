import React from 'react'
import { Link } from 'react-router-dom';

const ViewAsList = () => {
    const filterUniversities = () => {
        alert('Filter button clicked!');
    }

  return (
    <div className='m-5'>
        <button className='w-20 mb-5 p-4 text-base border border-gray-500 rounded-md bg-gray-100 hover:bg-gray-200' onClick={filterUniversities}>Filter</button>

        <div className='border border-solid border-gray-300 p-3 mb-3'>
            <h2 className='text-2xl font-bold mb-2'><Link to='/universities/university'>University 1</Link></h2>
            <p><strong>Location:</strong> City A</p>
            <p><strong>Rating:</strong> 4.5</p>
            <p><strong>Faculty Names:</strong> Engineering, Science</p>
        </div>

        <div className='border border-solid border-gray-300 p-3 mb-3'>
            <h2 className='text-2xl font-bold mb-2'><Link to='/universities/university'>University 2</Link></h2>
            <p><strong>Location:</strong> City B</p>
            <p><strong>Rating:</strong> 4.0</p>
            <p><strong>Faculty Names:</strong> Arts, Business</p>
        </div>
    </div>
  )
}

export default ViewAsList