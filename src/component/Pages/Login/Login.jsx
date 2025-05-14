import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginLogo from "../../../../public/lottie/Animation1.json";
import Lottie from "lottie-react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../Provider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const {user,setUser,signIn}=useContext(AuthContext)
  const [error,setError]=useState(null)
  const location=useLocation()
  const navigate=useNavigate()
  const handleSubmit=(e)=>{
    e.preventDefault()
    const form=e.target
    const email=form.email.value
    const password=form.password.value
    console.log({email,password})
    signIn(email,password)
    .then(result=>{
      const user=result.user
      console.log(user)
      setUser(user)
      navigate(location?.state? location.state:'/')
      setTimeout(()=>{
        toast.success("Login Successful")
      },1000)
    })
    .catch(error=>{
      console.log(error)
      setError(error.message)
      toast.error(error.message)
    })
  }

  return (
    <div className="min-h-[650px] flex items-center justify-center bg-gray-50 px-4">
      <div className="flex flex-col lg:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden max-w-5xl w-full">
        
        {/* Lottie Animation */}
        <div className="lg:w-1/2 flex items-center justify-center bg-gray-50 p-10">
          <Lottie animationData={loginLogo} className="md:w-96 md:h-96 w-40 h-40" />
        </div>

        {/* Login Form */}
        <div className="lg:w-1/2 p-8 sm:p-10">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            LOGIN NOW
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                required
              />
              <div className="text-right mt-1">
                <a href="#" className="text-sm text-blue-500 hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>

            <button type="submit" className="btn bg-yellow-500 hover:bg-yellow-600 text-white w-full">
              Login
            </button>

            <p className="text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link to="/register" className="font-semibold text-blue-600 hover:underline">
                Register
              </Link>
            </p>

            <div className="divider">OR</div>

            <button
              type="button"
              className="btn btn-outline w-full flex items-center justify-center gap-2 hover:bg-yellow-100"
            >
              <FcGoogle size={20} /> Sign in with Google
            </button>
          </form>
        </div>
      </div>
      <Toaster></Toaster>
    </div>
  );
};

export default Login;
