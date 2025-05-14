import Lottie from "lottie-react";
import React from "react";
import { Link } from "react-router-dom";
import registerLogo from "../../../../public/lottie/Animation2.json";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  return (
    <div className="min-h-[680px] flex items-center justify-center bg-gray-50 px-4">
      <div className="flex flex-col lg:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden max-w-5xl w-full">
        
        {/* Lottie Animation */}
        <div className="lg:w-1/2 flex items-center justify-center bg-gray-50 p-10">
          <Lottie animationData={registerLogo} className="md:w-96 md:h-96 w-40 h-40" />
        </div>

        {/* Register Form */}
        <div className="lg:w-1/2 p-8 sm:p-10">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            REGISTER NOW
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                name="name"
                type="text"
                placeholder="Enter your name"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Photo URL</label>
              <input
                name="photo"
                type="url"
                placeholder="Enter photo URL"
                className="input input-bordered w-full"
                required
              />
            </div>

            <button
              type="submit"
              className="btn bg-red-500 hover:bg-red-600 text-white w-full"
            >
              Register
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-600 hover:underline"
              >
                Login
              </Link>
            </p>

            <div className="divider">OR</div>

            <button
              type="button"
              className="btn btn-outline w-full flex items-center justify-center gap-2 hover:bg-red-100"
            >
              <FcGoogle size={20} /> Register with Google
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
