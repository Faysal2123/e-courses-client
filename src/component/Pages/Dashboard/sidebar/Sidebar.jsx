import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaUsers,
  FaRegStickyNote,
  FaSignOutAlt,
} from "react-icons/fa";
import { SiSession } from "react-icons/si";
import { GiMaterialsScience } from "react-icons/gi";
import { AiOutlineBars } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";

import { AuthContext } from "../../../Provider/AuthProvider";
import useRole from "../../../component/Hook/useRole";

const SideBar = () => {
  const { logOut } = useContext(AuthContext);
  const [isActive, setActive] = useState(false);
  const [role] = useRole();

  const handleToggle = () => setActive(!isActive);

  const navLinkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-lime-100 text-lime-800 shadow"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  const menuItems = {
    tutor: [
      { to: "/dashboard/createSession", label: "Create Session", icon: <FaUsers /> },
      { to: "/dashboard/viewSessions", label: "All Sessions", icon: <SiSession /> },
      { to: "/dashboard/uploadMaterials", label: "Upload Materials", icon: <GiMaterialsScience /> },
      { to: "/dashboard/studyMaterials", label: "View Materials", icon: <GiMaterialsScience /> },
    ],
    student: [
      { to: "/dashboard/viewBooked", label: "Booked Sessions", icon: <FaUsers /> },
      { to: "/dashboard/createNote", label: "Create Note", icon: <SiSession /> },
      { to: "/dashboard/manageNotes", label: "Manage Notes", icon: <FaRegStickyNote /> },
      { to: "/dashboard/viewMaterials", label: "Study Materials", icon: <GiMaterialsScience /> },
    ],
    admin: [
      { to: "/dashboard/allUsers", label: "All Users", icon: <FaUsers /> },
      { to: "/dashboard/allStudySession", label: "All Sessions", icon: <SiSession /> },
      { to: "/dashboard/allMaterials", label: "All Materials", icon: <GiMaterialsScience /> },
    ],
  };

  return (
    <>
      {/* Mobile topbar */}
      <div className="bg-white p-4 shadow-md flex items-center justify-between md:hidden">
        
        <button
          onClick={handleToggle}
          className="text-gray-600 hover:text-black"
        >
          <AiOutlineBars size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-50 md:fixed bg-white w-64 h-screen px-4 py-6 border-r border-gray-200 shadow-lg transform transition-transform duration-300 ${
          isActive ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
         
        </div>

        {/* Role Title */}
        <div className="mb-4 px-2">
          <p className="text-xs uppercase text-gray-400 tracking-wider">
            {role} Panel
          </p>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {menuItems[role]?.map((item, index) => (
            <li key={index} className="list-none">
              <NavLink to={item.to} className={navLinkStyle}>
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </NavLink>
            </li>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="mt-10 border-t pt-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition">
            <FiSettings size={18} />
            Settings
          </button>
          <button
            onClick={logOut}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-red-600 hover:bg-red-100 transition"
          >
            <FaSignOutAlt size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Close Button */}
      {isActive && (
        <button
          onClick={handleToggle}
          className="fixed bottom-4 left-4 bg-gray-800 text-white p-3 rounded-full md:hidden"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      )}
    </>
  );
};

export default SideBar;
