import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
  const {user,logOut}=useContext(AuthContext)
  const handleLogOut=()=>{
    logOut()
  }
  return (
    <div className="bg-black/85 glass">
      <div className="md:w-11/12 mx-auto">
        <div className="navbar  shadow-lg  ">
          <div className="navbar-start">
            <div className="dropdown text-white">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-base text-white"
              >
                <li>
                  <Link to="/">Home</Link>
                </li>

                <li>
                  <Link to="/course">Course</Link>
                </li>
                <li>
                  <Link to="/about">About us</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
            <a className=" md:text-3xl text-2xl font-extrabold text-white">
              <span className="text-yellow-500">E</span>-Courses
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-base font-semibold text-white">
              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/course">Course</Link>
              </li>
              <li>
                <Link to="/about">About us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="navbar-end gap-3">
            {user ? (
              <>
               <div className="flex gap-2 items-center">
                <div>
                  <img
                    className="h-10 w-10 rounded-full object-fill"
                    src={user?.photoURL}
                    alt=""
                  />
                </div>
                <button onClick={handleLogOut} className="btn btn-warning">
                  Logout
                </button>
              </div>
              </>
            ) : (
              <>
                <Link to="/register" className="btn md:text-base font-semibold">
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="btn bg-yellow-500 text-black font-semibold md:text-base border-yellow-500"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
