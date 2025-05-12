import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import PopularCourse from '../component/Popular/PopularCourse';
import ChooseUs from '../ChooseUs/ChooseUs';

const MainLayouts = () => {
    return (
        <div>
           <Navbar></Navbar> 
           <div><Outlet></Outlet></div>
           <Footer></Footer>
           <PopularCourse></PopularCourse>
           <ChooseUs></ChooseUs>
        </div>
    );
};

export default MainLayouts;