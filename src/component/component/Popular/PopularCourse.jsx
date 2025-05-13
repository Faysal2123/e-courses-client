import React, { useEffect, useState } from 'react';

const PopularCourse = () => {
    const [session, setSession] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:5000/course')
            .then(res => res.json())
            .then(data => setSession(data.slice(0,8)))
              .catch(error => console.error('Error fetching data: ', error));
    }, []);

    return (
        <div className="w-11/12 mx-auto py-10 ">
            <div>
                <h1 className="text-3xl font-bold">
                    <span className="border-b-4 border-yellow-500 pb-1 ">Pop</span>ular
                    <span className="text-yellow-500"> Courses</span>
                </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                {session.map((course, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <img src={course.image} alt={course.title} className="w-full h-56 object-cover" />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold text-gray-800">{course.title}</h2>
                            <p className="text-gray-600 mt-2">{course.description}</p>
                            <div className="flex justify-between items-center mt-4">
                                <div>
                                    <p className="text-gray-500 text-sm">Tutor: {course.tutor_name}</p>
                                    <p className="text-gray-500 text-sm">Rating: {course.average_rating}</p>
                                </div>
                                <button className="bg-yellow-500 text-white py-2 px-4 rounded-md">View Details</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularCourse;
