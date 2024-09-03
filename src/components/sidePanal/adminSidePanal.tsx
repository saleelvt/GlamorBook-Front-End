import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { RootState } from "../../reduxKit/store";

const AdminSidebar: React.FC = () => {
  const { role } = useSelector((state: RootState) => state.auth);
  const { userData } = useSelector((state: RootState) => state.auth);

  const [isOpen, setIsOpen] = useState(false);

  const adminEmail = userData || "Unknown";

  const toggleSidebar = () => {
    setIsOpen(prev => !prev);
  };

  const handleCloseSidebar = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Sidebar Toggle Button */}
      <header className="flex items-center justify-between w-full bg-gray-800 p-4 text-white">
        <button onClick={toggleSidebar} className="text-white">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
        <img src="/src/assets/logo-new.png" alt="Logo" className="h-10" />
      </header>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 bg-gray-800 h-full transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"} z-50`}
      >
        <nav className="mt-6">
          {`Role is: ${role}`}
          <NavLink
            to="/admin/home"
            className="block px-4 py-2 text-sm font-medium text-gray-300 hover:bg-red-500 hover:text-white"
            onClick={handleCloseSidebar}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/users-list"
            className="block px-4 py-2 text-sm font-medium text-gray-300 hover:bg-red-500 hover:text-white"
            onClick={handleCloseSidebar}
          >
            Users List
          </NavLink>
          <NavLink
            to="/admin/theatres-list"
            className="block px-4 py-2 text-sm font-medium text-gray-300 hover:bg-red-500 hover:text-white"
            onClick={handleCloseSidebar}
          >
            Salon List
          </NavLink>
        </nav>
        <div className="absolute bottom-4 left-4">
          <p className="text-sm text-gray-400">{adminEmail}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
