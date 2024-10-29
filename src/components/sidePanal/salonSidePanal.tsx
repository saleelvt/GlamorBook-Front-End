/* eslint-disable @typescript-eslint/no-explicit-any */
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

import { SalonProfilePage } from "../pages/salon/salonProfile";
import SalonServiceList from "../pages/salon/salonServiceList";
import { UserList } from "../pages/salon/userList";
import { useSelector } from "react-redux";
import { RootState } from "../../reduxKit/store";

export const SalonSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar starts open
  const [activeComponent, setActiveComponent] = useState<any>(null);

  const { role, userData } = useSelector((state: RootState) => state.auth);
  const { email }: any = userData;

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen rounded-lg  bg-white ">
      {/* Sidebar */}
      <div
        className={`flex flex-col  border  border-gray-300   rounded-lg  text-white w-64 h-full transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:w-64  z-50 shadow-2xl`}
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
        <div className="flex justify-center  p-4 space-x-4  shadow-lg  rounded-md w-56  lg:ml-3 lg:mt-4 border border-gray-600 bg-gradient-to-b from-green-500 via-green-700 to-green-900">
          <div className="w-12 h-12 rounded-full bg-gray-200"></div>
          <div>
            <h2 className="text-lg font-semibold"> {` Role:${role}`}</h2>
            <span className="text-sm font-medium text-gray-300">{`Email: ${email}`}</span>
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
            to="/"
            className={({ isActive }) =>
              `flex items-center px-4 py-3  rounded-xl text-gray-800 hover:bg-gray-700 hover:text-white transition-all duration-300 ${
                isActive ? "bg-gray-700" : ""
              }`
            }
          >
            <FaListAlt className="mr-3" /> Booking List
          </NavLink>
          <div className=" ">
            <button
              className="flex items-center px-4 py-3 rounded-xl text-gray-800 hover:bg-gray-700 w-64 hover:text-white transition-all duration-300"
              onClick={() => setActiveComponent("salonServiceList")}
            >
              <FaUser className="mr-3" /> Service List
            </button>
            {/* Add other side panel buttons if needed */}
          </div>

          <div className=" ">
            <button
              className="flex items-center px-4 py-3 rounded-xl text-gray-800 hover:bg-gray-700 w-64 hover:text-white transition-all duration-300"
              onClick={() => setActiveComponent("profile")}
            >
              <FaUser className="mr-3" /> Profile
            </button>
            {/* Add other side panel buttons if needed */}
          </div>
          <div className=" ">
            <button
              className="flex items-center px-4 py-3 rounded-xl text-gray-800 hover:bg-gray-700 w-64 hover:text-white transition-all duration-300"
              onClick={() => setActiveComponent("userList")}
            >
              <FaUser className="mr-3" /> User List
            </button>
            {/* Add other side panel buttons if needed */}
          </div>

          <NavLink
            to="/salonSettings"
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
      <div className="flex-auto p-5 ">
        <div className="p-6 rounded-lg  bg-slate-100 border  border-gray-300   shadow-md">
          {/* Replace with actual content */}
   

        
            {activeComponent === "profile" && <SalonProfilePage />}
            {activeComponent === "salonServiceList" && ( <SalonServiceList /> )}
            {activeComponent === "userList" && ( <UserList/> )}

       
        </div>
      </div>
    </div>
  );
};

export default SalonSidebar;
