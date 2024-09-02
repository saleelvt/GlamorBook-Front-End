import React from "react";
import { useFormik } from "formik";
import "tailwindcss/tailwind.css";

import { useDispatch, useSelector } from "react-redux";
import { loginSalon } from "../../../reduxKit/actions/auth/authActions";


import { AppDispatch, RootState } from "../../../reduxKit/store";
import { useNavigate, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import { ValidationLogin } from "../../../validations/salon/loginSalonValidation"

import { SalonLoginInterfaces } from "../../../interfaces/salon/salonLoginInterfaces";

const SalonLogin: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.auth);

  const initialValues: SalonLoginInterfaces = {
    email: "",
    password: "",
  };

  const formik = useFormik<SalonLoginInterfaces>({
    initialValues,
    validationSchema: ValidationLogin,
    onSubmit: async (values) => {
      try {
        const theaterData = await dispatch(loginSalon(values)).unwrap();

        console.log(theaterData, "before going to slaon home page ");
        navigate("/salonHome");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Login failed:", err);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: err.message || "An unexpected error occurred",
        });
      }
    },
  });

  //   useEffect(() => {
  //     if (theaterOwner) {
  //       navigate("/theater/dashboard");
  //     }
  //   }, [theaterOwner, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-pink-300 to-yellow-200 bg-cover bg-center"  >
      <div className="flex flex-col md:flex-row items-center   p-6 ">
        <div className="p-6 rounded shadow-md w-full max-w-md bg-gray-300">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-950">
            LogIn  Your Salon Account
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-950 text-start">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...formik.getFieldProps("email")}
                className="w-full p-2 border border-gray-400 rounded mt-1 text-gray-950"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-950 text-start"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                {...formik.getFieldProps("password")}
                className="w-full p-2 border border-gray-400 rounded mt-1 text-gray-950"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>

            <div className="flex items-center justify-between mb-6">
              <NavLink
                className="inline-block align-baseline font-bold text-sm"
                to="/forgotPassword"
                style={{ color: "red" }} // Adjust the color as needed
              >
                Forgot Your Password?  <span style={{color:"black"}}>Click Here</span>
              </NavLink>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full p-2 border border-gray-300 rounded-lg mt-1 bg-gradient-to-tr from-pink-600 to-yellow-500 text-white"
                disabled={loading}
              >
                {loading ? "Logging In..." : "Login"}
              </button>
            
            </div>
          </form>
          <div className="mt-4 text-center">
            <span className="text-gray-950">
              Don't have an account?{" "}
              <NavLink to="/salonSignup" style={{ color: "red" }}>
                  Signup
                </NavLink>
            </span>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default SalonLogin;
