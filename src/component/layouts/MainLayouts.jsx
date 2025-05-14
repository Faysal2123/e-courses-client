import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import PopularCourse from '../component/Popular/PopularCourse';
import ChooseUs from '../component/ChooseUs/ChooseUs';
import Feedback from '../component/Feedback/Feedback';

const MainLayouts = () => {
    return (
        <div>
           <Navbar></Navbar> 
           <div className='min-h-[calc(100vh-237px)]'><Outlet></Outlet></div>
           <Footer></Footer>
          
        </div>
    );
};

export default MainLayouts;