import React from 'react';
import Header from './_DashboardComponents/Header';
import SideBar from './_DashboardComponents/SideBar';

function Layout({ children }) {
  return (
    <div>
    
      <div className="dashboard-layout hidden lg:flex">
        <div className="h-screen lg:w-[18%] w-[15%] ">
          <SideBar />
        </div> 
        <div className="w-[85%] lg:w-[82%]">
          <Header />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>

      <div className="small-screen-message flex items-center justify-center h-screen bg-primary lg:hidden">
        <p className="text-xl text-center text-gray-100">
          Please open the dashboard on a laptop or computer for the best experience.
        </p>
      </div>
    </div>
  );
}

export default Layout;