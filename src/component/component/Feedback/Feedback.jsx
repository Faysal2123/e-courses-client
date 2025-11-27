import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';

const Feedback = () => {
    const [feedback, setFeedback] = useState([]);

    useEffect(() => {
        fetch('https://e-courses-server-gamma.vercel.app/reviews')
            .then(res => res.json())
            .then(data => setFeedback(data));
    }, []);

    return (
        <div className="w-11/12 mx-auto py-14 px-5" >
            <h1 className="text-4xl font-bold text-center mb-10">
                <span className="border-b-4 border-yellow-400 pb-1">Fee</span>dback from Our <span className="text-yellow-500">Students</span>
            </h1>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {feedback.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
                    >
                        <div className="flex flex-col items-center text-center">
                            <img
                                src={item.image}
                                alt={item.user}
                                className="w-24 h-24 rounded-full object-cover ring-4 ring-yellow-400 mb-4"
                            />
                            <h3 className="text-xl font-semibold text-gray-800">{item.user}</h3>
                            <p className="text-gray-600 italic mt-2">"{item.comment}"</p>
                            <div className="flex items-center gap-1 text-yellow-500 mt-4">
                                {Array.from({ length: Math.floor(item.rating) }, (_, i) => (
                                    <FaStar key={i} />
                                ))}
                                <span className="text-sm text-gray-700 ml-2">({item.rating})</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Feedback;
