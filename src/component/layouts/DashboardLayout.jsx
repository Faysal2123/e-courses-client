import React from 'react';
import SideBar from '../Pages/Dashboard/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <div>
              <div className=' relative min-h-screen md:flex bg-white'>
            <div className=' '>
                <SideBar ></SideBar>
            </div>
            <div className='flex-1  md:ml-64'>
        <div className='p-5'>
          
          <Outlet />
        </div>
      </div>
        </div>
        </div>
    );
};

export default DashboardLayout;