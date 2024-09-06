// src/components/Navbar.tsx

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../reduxKit/store";
import { salonLogout } from "../../reduxKit/actions/auth/authActions";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import "../../CSS/logoHeading.css";
const Navbar: React.FC = () => {
  const { isLogged,role } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
console.log('my salon role is ',role,isLogged);

  const handledata = async () => {
    try {
        console.log('my dispatch');
        
      await dispatch(salonLogout()).unwrap();
      Swal.fire({
        icon: "success",
        title: "Logged out successfully!",
        showConfirmButton: false,
        timer: 1000,
        toast: true,
      }).then(() => {
        navigate("/salonLogin");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Logout failed!",
        showConfirmButton: true,
      });
    }
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-tr from-pink-300 to-yellow-200 p-4">
      <div className="container mx-auto flex justify-between items-center">
      <h1 className="glamor-book-heading">Glamor Book</h1>
        <div className="lg:hidden">
          <button className=" focus:outline-none" onClick={toggleMenu}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
        <div
          className={`lg:flex lg:items-center ${isOpen ? "block" : "hidden"}`}
        >
          <Link
            to="/services"
            className="block font-semibold px-4 py-2 hover:bg-gray-300 rounded"
          >
            Services
          </Link>
          <Link
            to="/contact"
            className="block px-4 py-2 font-semibold hover:bg-gray-300 rounded"
          >
            Contact
          </Link>
          <Link
            to="/about"
            className="block px-4 py-2 font-semibold hover:bg-gray-300 rounded"
          >
            About
          </Link>
          {isLogged ? (
            <Button
              onClick={handledata}
              radius="full"
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg rounded-md"
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/salonLogin")}
              radius="full"
              className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg rounded-md"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
