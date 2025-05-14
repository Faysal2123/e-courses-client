import React from 'react';

const About = () => {
    return (
        <div className="bg-white py-20 px-6 lg:px-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                
                {/* Left Text Section */}
                <div>
                    {/* Gradient Label */}
                    <span className="inline-block px-4 py-1 text-sm font-semibold text-white bg-yellow-500 rounded-full mb-4">
                        About Our Platform
                    </span>

                    {/* Main Heading */}
                    <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-snug">
                        Transforming Learning for a Better Future
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                        We are dedicated to building a dynamic and inclusive learning environment where students and professionals can grow their skills. Our platform offers curated courses by expert instructors, real-world learning, and community support.
                    </p>

                    {/* Key Features */}
                    <ul className="space-y-3 mb-8">
                        <li className="flex items-center text-gray-700">
                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 mr-3"></span>
                            Expert Tutors with Real-World Experience
                        </li>
                        <li className="flex items-center text-gray-700">
                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 mr-3"></span>
                            Free & Premium Courses Available
                        </li>
                        <li className="flex items-center text-gray-700">
                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 mr-3"></span>
                            Lifetime Access to Course Materials
                        </li>
                    </ul>

                    {/* CTA Button */}
                    <button className="px-6 py-3 bg-yellow-500 text-white font-medium rounded-lg shadow-md hover:bg-yellow-700 transition duration-300">
                        Explore Courses
                    </button>
                </div>

                {/* Right Image Section */}
                <div>
                    <img
                        src="https://i.ibb.co/hDDmvGh/books-5504893-1280.jpg"
                        alt="Learning Illustration"
                        className="w-full h-[500px] rounded-xl shadow-xl"
                    />
                </div>
            </div>
        </div>
    );
};

export default About;
