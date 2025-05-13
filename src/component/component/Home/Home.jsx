import React from 'react';
import Banner from '../Banner/Banner';
import FavCourse from '../favourite/FavCourse';
import PopularCourse from '../Popular/PopularCourse';
import ChooseUs from '../ChooseUs/ChooseUs';
import Feedback from '../Feedback/Feedback';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FavCourse></FavCourse>
             <PopularCourse></PopularCourse>
           <ChooseUs></ChooseUs>
           <Feedback></Feedback>
        </div>
    );
};

export default Home;