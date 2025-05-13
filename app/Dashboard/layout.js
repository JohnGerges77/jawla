import React from 'react'
import Header from './_DashboardComponents/Header'
import SideBar from './_DashboardComponents/SideBar'

function layout({children}) {
  return (
    <div className='flex'>
      <div className='h-screen w-[18%]'>

      <SideBar />
      </div>
      <div className='w-[82%]'>

      <Header />
      <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}

export default layout
