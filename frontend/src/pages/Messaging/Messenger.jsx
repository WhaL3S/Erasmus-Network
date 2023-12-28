import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'

const Messenger = () => {
  return (
    <div className='bg-gray-200 h-screen'>
        <Navbar />
        <div className='m-10 h-3/4 w-11/12 flex flex-row rounded-3xl space-x-10' >
          <div className="flex flex-col w-1/4 h-full space-y-6">
              <div className='w-full h-1/6 flex justify-center items-center bg-white rounded-3xl border-black border'>
                  <h1>Chats list</h1>
              </div>

              <div className='w-full h h-5/6 flex flex-col justify-center bg-white rounded-3xl border-black border'>
                <div className='w-full h-1/4 flex justify-center items-center'>
                    <h3>Aa</h3>
                </div>

                <hr className='border-none h-px bg-black' />
                <div className='w-full h-1/4 flex justify-center items-center'>
                    <h3>Bb</h3>
                </div>
                
                <hr className='border-none h-px bg-black' />
                <div className='w-full h-1/4 flex justify-center items-center'>
                    <h3>Cc</h3>
                </div>
                
                <hr className='border-none h-px bg-black' />
                <div className='w-full h-1/4 flex justify-center items-center'>
                    <h3>Dd</h3>
                </div>
              </div>
          </div>
          <div className="flex flex-col w-3/4 h-full space-y-6">
              <div className="w-full h-1/6 flex justify-center items-center justify-self-center border-black border bg-white rounded-3xl">
                  <h1>Aa</h1>
              </div>

              <div className="w-full h-5/6 flex flex-col space-y-6">
                <div className="w-full h-5/6 flex justify-center items-center border-black border bg-white rounded-3xl">
                    <h1>Chat</h1>
                </div>

                <div className="w-full h-1/6 flex items-center justify-center space-x-2 border-black border bg-white rounded-3xl">
                    <input type="text" className='h-8 border border-black w-4/6 rounded-md text-xl p-3 tracking-widest' />
                    <Link className='flex justify-center text-center w-28 h-8 border border-black rounded-md bg-gray-200' to="/messenger/attachment">Attachment</Link>
                    <button className='flex justify-center text-center w-16 h-8 border border-black rounded-md bg-gray-200'>Send</button>
                </div>
              </div>
              
          </div>
        </div>
    </div>
  )
}

export default Messenger