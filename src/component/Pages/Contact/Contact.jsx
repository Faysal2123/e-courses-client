import React from 'react';

const Contact = () => {
    return (
        <div className="bg-gray-50 py-20 px-6 lg:px-16 min-h-[650px]">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12">
                {/* Heading */}
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold text-gray-800 mb-2">Get in Touch</h2>
                    <p className="text-gray-600 text-lg">
                        Have questions, feedback, or collaboration ideas? We'd love to hear from you!
                    </p>
                </div>

                {/* Contact Form */}
                <form className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            Your Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows="5"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            placeholder="Write your message here..."
                        ></textarea>
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;
