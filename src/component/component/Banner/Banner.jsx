import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="bg-black/85 flex flex-col md:flex-row justify-between items-center md:items-start px-5 md:px-15 md:pt-10 pb-10">
    <div className="md:pt-20 md:pb-20 pt-10 mb:pb-20 pb-5 text-center md:text-left">
      <h1 className="md:text-7xl text-3xl  text-white font-extrabold">
        Welcome to <span className="text-yellow-500">E-Courses</span>
      </h1>
      <p className="md:text-3xl text-lg md:w-[700px] mt-5 text-white">
        Where knowledge meets innovation. Join our community of passionate learners and unlock your potential.
      </p>
      <div className="mt-5 ">
        <button className="btn bg-yellow-500 text-lg py-3 gap-3 flex items-center justify-center">Learn More <span><FaLongArrowAltRight /></span></button>
      </div>
    </div>
  
    {/* Image with shadow layer */}
    <div className="relative  md:mt-0 ">
      {/* Shadow layer behind image */}
      <div className="absolute md:top-6 md:left-7 top-3 left-3 bg-yellow-900 w-full h-full -z-10 rounded-md"></div>
  
      <img
        className="md:h-[400px] md:w-[450px] h-[300px] w-[300px] object-cover rounded-md"
        src="/image/p1.jpg"
        alt="Banner"
      />
    </div>
  </div>
  );
};

export default Banner;
