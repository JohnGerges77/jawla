import React from 'react'

function profile() {
  return (
    <div>
          <div className='flex items-center space-between w-[75%] mx-auto mt-[2em]  h-fit px-[1em] py-[3em] bg-gradient-to-r from-[#FFFFFF40] to-[#FFFFFF1A] rounded-[1em]'>
      <div className='w-[20%] flex items-center justify-center'>
        <img src='./images/user (4).png' alt="logo" className="h-[3em]" />
      </div>
      <div className='text-white w-[75%]'>
        <h3 className='text-[1.5em] font-bold'>Jihad Hamdy</h3>
        <p className='max-w-[85%] h-fit'>gehadhamdy123@gmail.com</p>
      </div>
    </div>
    </div>
  )
}

export default profile
