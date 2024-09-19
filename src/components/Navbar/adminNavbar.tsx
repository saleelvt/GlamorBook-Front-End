// src/components/Navbar.tsx

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../reduxKit/store";
import Swal from "sweetalert2";
import "../../CSS/logoHeading.css";
import { FaSignOutAlt } from "react-icons/fa";

import { adminLogout } from "../../reduxKit/actions/auth/authActions";
import { useSelector } from 'react-redux';
import { RootState } from '../../reduxKit/store';

const Navbar: React.FC = () => {
  const {role}=useSelector((state:RootState)=>state.auth)

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);


  console.log('this is my role  admin ',role);
  



  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };



  const handledata = async () => {
    try {
      await dispatch(adminLogout()).unwrap();
      Swal.fire({
        icon: "success",
        title: "Logged out successfully!",
        showConfirmButton: false,
        timer: 1000,
        toast:true
      }).then(() => {
        navigate("/adminLogin");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Logout failed!",
        showConfirmButton: true,
      });
    }
  };

  return (
    <nav className="bg-gradient-to-tr from-pink-300 to-yellow-200 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className=" text-4xl font-bold">
      <h1 className="glamor-book-heading">Admin Of Glamor Book </h1>
        </div>
        {/* <h1>{adminDetails}</h1> */}
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
            to="/about"
            className="block px-4 py-2 font-semibold hover:bg-gray-300 rounded"
          >
            About
          </Link>
          <Button
            onClick={handledata}
            radius="full"
            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg rounded-md"
          >
                  <FaSignOutAlt className="mr-3" /> Logout

          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
