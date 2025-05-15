import Lottie from "lottie-react";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import registerLogo from "../../../../public/lottie/Animation2.json";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../Provider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import useAxiosPublic from "../../component/Hook/useAxiosPublic";

const Register = () => {
  const { user, setUser, createUser, updateUserProfile } =
    useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(e);
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.value;
    const role =form.role.value;
    console.log({ name, email, password, photo ,role});
    try {
      const result = await createUser(email, password);
      await updateUserProfile(name, photo);
      setUser({ ...result.user, displayName: name, photoURL: photo });
      await axiosPublic.post("/users", {
        name,
        email,
        photo,
        role
      });
      toast.success("Registration Successful");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Registration Failed");
    }
  };
  return (
    <div className="min-h-[680px] flex items-center justify-center bg-gray-50 px-4">
      <div className="flex flex-col lg:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden max-w-5xl w-full">
        {/* Lottie Animation */}
        <div className="lg:w-1/2 flex items-center justify-center bg-gray-50 p-10">
          <Lottie
            animationData={registerLogo}
            className="md:w-96 md:h-96 w-40 h-40"
          />
        </div>

        {/* Register Form */}
        <div className="lg:w-1/2 p-8 sm:p-10">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            REGISTER NOW
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
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
              <label className="block text-sm font-medium mb-1">
                User Role
              </label>
              <select
                name="role"
                className="select select-bordered w-full"
                required
              >
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="tutor">Tutor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Photo URL
              </label>
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
      <Toaster></Toaster>
    </div>
  );
};

export default Register;
