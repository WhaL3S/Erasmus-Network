import React from 'react'

const ViewApplications = () => {
  return (
    <div className='m-5'>
        <h2 className='text-2xl font-bold mb-2'>Universities Applied</h2>

        <div className='border border-solid border-gray-300 p-3 mb-3'>
            <h3 className="text-xl font-bold mb-2">University 1</h3>
            <p><strong>Location:</strong> City A</p>
            <p><strong>Status:</strong> Application Submitted</p>
        </div>

        <div className='border border-solid border-gray-300 p-3 mb-3'>
            <h3 className="text-xl font-bold mb-2">University 2</h3>
            <p><strong>Location:</strong> City B</p>
            <p><strong>Status:</strong> Application Under Review</p>
        </div>

        <div className='border border-solid border-gray-300 p-3 mb-3'>
            <h3 className="text-xl font-bold mb-2">University 3</h3>
            <p><strong>Location:</strong> City C</p>
            <p><strong>Status:</strong> Application Accepted</p>
        </div>
    </div>
  )
}

export default ViewApplications