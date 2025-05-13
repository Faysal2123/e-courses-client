import React from 'react';

const ChooseUs = () => {
    return (
        <div className='bg-gray-50 '>
            <div className='w-11/12 mx-auto py-10'>
                <div className='flex flex-col lg:flex-row items-center justify-evenly  gap-10'>
                    
                    {/* Image Section with Circle Background */}
                    <div className='relative w-[500px] h-[400px] flex-shrink-0 '>
                        {/* Yellow Circle (behind) */}
                        <div className='absolute top-32 left-28 w-[260px] h-[260px] rounded-full bg-yellow-500 z-0'></div>

                        {/* Image (slightly larger than the circle) */}
                        <img
                            src="/image/why.png"
                            alt="Why Choose Us"
                            className='w-[800px] h-[450px] object-contain relative z-10'
                        />
                    </div>

                    {/* Text Section */}
                    <div className=' text-center lg:text-left'>
                        <h1 className='text-3xl font-bold'>
                            <span className='border-b-4 border-yellow-500 pb-1'>Wh</span>y You Choose
                            <span className='text-yellow-500'> E-Courses</span>
                        </h1>
                        <p className="text-gray-600 mt-4">
                            Discover the advantages of joining our E-Courses:
                        </p>
                        <ul className="list-disc list-inside text-gray-600 mt-3 space-y-1">
                            <li>Expert instruction from experienced tutors</li>
                            <li>Comprehensive and up-to-date course content</li>
                            <li>Supportive and interactive learning community</li>
                            <li>Flexible learning schedule at your convenience</li>
                        </ul>
                       <div className='mt-6'>
                         <button className='btn bg-yellow-500'>Learn More</button>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChooseUs;
