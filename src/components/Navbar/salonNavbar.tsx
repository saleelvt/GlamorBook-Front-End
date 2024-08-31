// src/components/Navbar.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gradient-to-tr from-pink-300 to-yellow-200 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className=" text-4xl font-bold">
                    <Link to="/">GlamorBook</Link>
                </div>
                <div className="lg:hidden">
                    <button
                        className=" focus:outline-none"
                        onClick={toggleMenu}
                    >
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
                <div className={`lg:flex lg:items-center ${isOpen ? 'block' : 'hidden'}`}>
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
                    <Link
                        to="/salonLogin"
                        className="block first-letter:font-semibold px-4 py-2 hover:bg-gray-300 rounded"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
