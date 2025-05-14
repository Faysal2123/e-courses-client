import React, { useEffect, useState } from 'react';

const Course = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/course')
            .then(res => res.json())
            .then(data => setCourses(data))
            .catch(error => console.error("Error fetching courses:", error));
    }, []); // Empty dependency array to run only once

    return (
        <div className="p-6 bg-gray-50">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">All Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {courses.map(course => (
                    <div key={course._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition-all duration-300">
                        <div className="w-full h-56 relative">
                            <img 
                                src={course.image} 
                                alt={course.title} 
                                className="object-cover w-full h-56 rounded-t-lg" 
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>
                            <p className="text-sm text-gray-600 mt-2">{course.description?.slice(0, 120)}...</p>
                            <div className="flex justify-between items-center mt-4">
                                <p className="text-sm text-gray-700"><strong>Tutor:</strong> {course.tutor_name}</p>
                                <p className="text-sm text-gray-700"><strong>Rating:</strong> {course.average_rating}</p>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <p className="text-sm font-semibold text-green-500">
                                    {course.registration_fee === 0 ? "Free" : `$${course.registration_fee}`}
                                </p>
                                <button
                                    onClick={() => window.open(course.google_drive_link, '_blank')}
                                    className="text-sm text-white bg-yellow-500 hover:bg-yellow-600 py-2 px-4 rounded-md"
                                >
                                    View Materials
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Course;
