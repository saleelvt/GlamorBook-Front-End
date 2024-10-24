import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaListAlt,
  FaUser,
  FaCog,
} from "react-icons/fa";

const AdminSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar starts open

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen rounded-lg  bg-white ">
      {/* Sidebar */}
      <div
        className={`flex flex-col  rounded-lg  text-white w-64 h-full transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:w-64 z-50 shadow-2xl`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center  rounded-lg justify-between ">
          {/* <h1 className="text-xl font-bold">Admin Panel</h1> */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-white focus:outline-none text-2xl"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Profile Section */}
        <div className="flex items-center p-4 space-x-4  shadow-lg  rounded-md w-56  lg:ml-3 lg:mt-4 border border-gray-600 bg-gradient-to-b from-green-500 via-green-700 to-green-900">
          <div className="w-12 h-12 rounded-full bg-gray-400"></div>
          <div>
            <h2 className="text-lg font-semibold">Saleel vt </h2>
            <span className="text-sm text-gray-300">admin12@gmail.com</span>
          </div>
        </div>

        {/* Sidebar Links */}
        <nav className="flex-1 mt-4 space-y-2">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center px-4 py-3  rounded-xl text-gray-800 hover:bg-gray-700 hover:text-white transition-all duration-300 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <FaHome className="mr-3" /> Dashboard
          </NavLink>
          <NavLink
            to="/adminSalonList"
            className={({ isActive }) =>
              `flex items-center px-4 py-3  rounded-xl text-gray-800 hover:bg-gray-700 hover:text-white transition-all duration-300 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <FaListAlt className="mr-3" /> Salon List
          </NavLink>
          <NavLink
            to="/admin/profile"
            className={({ isActive }) =>
              `flex items-center px-4 py-3  rounded-xl text-gray-800 hover:bg-gray-700 hover:text-white transition-all duration-300 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <FaUser className="mr-3" /> Profile
          </NavLink>
          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-xl text-gray-800 hover:bg-gray-700 hover:text-white transition-all duration-300 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <FaCog className="mr-3" /> Settings
          </NavLink>
        </nav>
        {/* Logout Section */}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <header className="flex items-center justify-between bg-gray-300  p-4 shadow-lg lg:hidden">
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          <button
            onClick={toggleSidebar}
            className="focus:outline-none text-2xl"
          >
            <FaBars />
          </button>
        </header>
        <div className="p-6 rounded-lg  bg-slate-400 shadow-md">
          {/* Replace with actual content */}
          <h2 className="text-2xl font-semibold mb-4">
            Welcome to the Admin Panel
          </h2>
          <p>
            This is your admin dashboard where you can manage your application.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
