import React from 'react';
import { FaPaintBrush, FaCode, FaBullhorn, FaPenNib } from 'react-icons/fa';

const FavCourse = () => {
    return (
        <div className='bg-gray-50'>
            <div className='w-11/12 mx-auto py-10 '>
            <h1 className='text-3xl font-bold'>
                <span className='border-b-4 border-yellow-500 pb-1 '>Pic</span>k your fav 
                <span className='text-yellow-500'> course</span>
            </h1>

            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4  mt-10 gap-5 md:gap-0' >
                {/* UX/UI Design */}
                <div className='flex flex-col justify-center items-center gap-4 md:p-16  p-8 border rounded-xl md:shadow-xl shadow-md hover:shadow-lg transition-all duration-300 border-none bg-white'>
                    <FaPaintBrush className='text-3xl ' />
                    <h2 className='text-xl font-semibold text-center'>UX/UI Design</h2>
                </div>

                {/* Development */}
                <div className='flex flex-col justify-center items-center gap-4 md:p-16 border rounded-xl md:shadow-xl shadow-md hover:shadow-lg transition-all duration-300 md:-ml-16 border-none  p-8 bg-white'>
                    <FaCode className='text-3xl ' />
                    <h2 className='text-xl font-semibold text-center'>Development</h2>
                </div>

                {/* Digital Marketing */}
                <div className='flex flex-col justify-center items-center gap-4 md:p-16 border rounded-xl md:shadow-xl shadow-md hover:shadow-lg transition-all duration-300 border-none md:-ml-16 p-8 bg-white'>
                    <FaBullhorn className='text-3xl ' />
                    <h2 className='text-xl font-semibold text-center'>Digital Marketing</h2>
                </div>

                {/* Content Writer */}
                <div className='flex flex-col justify-center items-center gap-4 md:p-16 border rounded-xl md:shadow-xl shadow-md hover:shadow-lg transition-all duration-300 border-none md:-ml-16 p-8 bg-white'>
                    <FaPenNib className='text-3xl ' />
                    <h2 className='text-xl font-semibold text-center'>Content Writer</h2>
                </div>
            </div>
        </div>
        </div>
    );
};

export default FavCourse;
