import React from "react";
import { FaFacebookF, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="w-11/12 mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo */}
        <div className="text-3xl font-bold">
          <span className="text-yellow-500">E</span>-Courses
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-5 text-sm md:text-base">
          <a href="#" className="hover:text-yellow-500 transition">Popularize</a>
          <a href="#" className="hover:text-yellow-500 transition">Analysis</a>
          <a href="#" className="hover:text-yellow-500 transition">Blog</a>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-11/12 mx-auto mt-6 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-gray-700 pt-6">
        {/* Copyright & Policy */}
        <div className="text-xs md:text-sm text-gray-400 flex gap-4">
          <p>© {new Date().getFullYear()} E-Courses</p>
          <p className="hover:text-yellow-500 cursor-pointer transition">Privacy & Policy</p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 text-lg">
          <a href="#" className="hover:text-yellow-500 transition"><FaFacebookF /></a>
          <a href="#" className="hover:text-yellow-500 transition"><FaLinkedin /></a>
          <a href="#" className="hover:text-yellow-500 transition"><FaTwitter /></a>
          <a href="#" className="hover:text-yellow-500 transition"><FaYoutube /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
