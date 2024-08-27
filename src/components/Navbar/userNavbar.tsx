import { Navbar, Button, Avatar } from "@nextui-org/react";
import LogoImg from "../../assets/images/Screenshot 2024-08-19 180559.png";
import { NavLink, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reduxKit/store";
import { logout } from "../../reduxKit/reducers/user/userSlice";

function UserNavbar() {
  // const dispatch = useDispatch<AppDispatch>();
  const { isLogged } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  return (
    <Navbar className="bg-gradient-to-tr from-pink-300 to-yellow-200 flex justify-end p-4">
      <div className="flex items-center space-x-4">
        <Avatar isBordered className="h-14 w-14 " radius="sm" src={LogoImg} />
        <h1 className="text-4xl font-extrabold bg-gradient-to-tr">
          Glamor Book
        </h1>
      </div>
      <div className="flex space-x-4 lg:w-auto md:w-auto h-7 items-center ml-auto">
        <NavLink
          to="/Login"
          className="block px-4 hover:bg-gray-700 rounded-md"
        >
          Home
        </NavLink>
        <NavLink
          to="/About"
          className="block px-4 hover:bg-gray-700 rounded-md"
        >
          About
        </NavLink>
        <NavLink
          to="/ContactUs"
          className="block px-4 hover:bg-gray-700 rounded-md"
        >
          Contact Us
        </NavLink>
        {isLogged ? (
          <Button
            onClick={() => dispatch(logout())}
            radius="full"
            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg rounded-md"
          >
            Logout
          </Button>
        ) : (
          <Button
            onClick={() => navigate("/login")}
            radius="full"
            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg rounded-md"
          >
            Login
          </Button>
        )}
      </div>
    </Navbar>
  );
}

export default UserNavbar;
