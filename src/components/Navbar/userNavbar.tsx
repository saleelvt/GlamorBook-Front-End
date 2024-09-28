import { Navbar, Button } from "@nextui-org/react";
import { NavLink, useNavigate } from "react-router-dom";
import "../../CSS/logoHeading.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../reduxKit/store";
import { logout } from "../../reduxKit/actions/user/userActions";
import Swal from "sweetalert2";

function UserNavbar() {
  const { isLogged } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
    Swal.fire({
      icon: "warning",
      text: "Logged out successfully!",
      showConfirmButton: false,
      toast: true,
      timerProgressBar: true,
      timer: 1500,
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <Navbar isBordered className="bg-wigth p-4">
      <div className="flex justify-between items-center w-full">
        <h1 className="glamor-book-heading">Glamor Book</h1>
        <div className="flex space-x-4 items-center">
          <NavLink
            to="/"
            className="block px-4 hover:bg-gradient-to-b from-green-500 via-green-700 to-green-900 rounded-md"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="block px-4 hover:bg-gradient-to-b from-green-500 via-green-700 to-green-900 rounded-md"
          >
            About
          </NavLink>
          <NavLink
            to="/contact-us"
            className="block px-4 hover:bg-gradient-to-b from-green-500 via-green-700 to-green-900  rounded-md"
          >
            Contact Us
          </NavLink>

          {isLogged ? (
            <Button
              onClick={handleLogout}
              radius="full"
              className=" bg-gradient-to-b from-green-500 via-green-700 to-green-900 text-white shadow-lg rounded-md"
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              radius="full"
              className=" bg-gradient-to-b from-green-500 via-green-700 to-green-900 text-white shadow-lg rounded-md"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </Navbar>
  );
}

export default UserNavbar;
