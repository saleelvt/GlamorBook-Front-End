import { Navbar, Button } from "@nextui-org/react";
import { NavLink, useNavigate } from "react-router-dom";
import "../../CSS/logoHeading.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../reduxKit/store";
import { logout } from "../../reduxKit/actions/user/userActions";
import Swal from "sweetalert2";
import { useState } from "react";

function UserNavbar() {
  const { isLogged } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    Swal.fire({
      icon: "warning",
      text: "Logged out successfully!",
      showConfirmButton: false,
      toast: true,
      timerProgressBar: true,
      timer: 1500,
    }).then(() => navigate("/"));
  };

  return (
    <Navbar isBordered className="bg-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="glamor-book-heading">Glamor Book</h1>

        {/* Toggle button for small screens */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </button>

        

        {/* Navbar links for larger screens */}
        <div className="hidden md:flex items-center space-x-3">
          <NavLink to="/" className="block px-4 hover:bg-gradient-to-b from-green-500 via-green-700 to-green-900 rounded-md">
            Home
          </NavLink>
          <NavLink to="/about" className="block px-4 hover:bg-gradient-to-b from-green-500 via-green-700 to-green-900 rounded-md">
            About
          </NavLink>
          <NavLink to="/contact-us" className="block px-4 hover:bg-gradient-to-b from-green-500 via-green-700 to-green-900 rounded-md">
            Contact Us
          </NavLink>

          {isLogged ? (
            <Button onClick={handleLogout} radius="full" className="bg-gradient-to-b from-green-500 via-green-700 to-green-900 text-white shadow-lg rounded-md">
              Logout
            </Button>
          ) : (
            <Button onClick={() => navigate("/login")} radius="full" className="bg-gradient-to-b from-green-500 via-green-700 to-green-900 text-white shadow-lg rounded-md">
              Login
            </Button>
          )}
        </div>
      </div>



      {/* Collapsible menu for small screens */}
      {isOpen && (
        <div className="md:hidden mt-64 space-y-2 px-4  p-4 pb-4 w-1/2  bg-white shadow-md rounded-b-lg">
          <NavLink to="/" className="block text-center py-2 hover:bg-gradient-to-b from-green-500 via-green-700 to-green-900 rounded-md">
            Home
          </NavLink>
          <NavLink to="/about" className="block text-center py-2 hover:bg-gradient-to-b from-green-500 via-green-700 to-green-900 rounded-md">
            About
          </NavLink>
          <NavLink to="/contact-us" className="block text-center py-2 hover:bg-gradient-to-b from-green-500 via-green-700 to-green-900 rounded-md">
            Contact Us
          </NavLink>

          <Button
            onClick={isLogged ? handleLogout : () => navigate("/login")}
            radius="full"
            className="w-full bg-gradient-to-b from-green-500 via-green-700 to-green-900 text-white shadow-lg rounded-md mt-2"
          >
            {isLogged ? "Logout" : "Login"}
          </Button>
        </div>
      )}
    </Navbar>
  );
}

export default UserNavbar;
