import React, { useState } from "react";
import { useFormik } from "formik";
import "tailwindcss/tailwind.css";

import { useDispatch, useSelector } from "react-redux";
import { loginSalon } from "../../../reduxKit/actions/auth/authActions";

import { AppDispatch, RootState } from "../../../reduxKit/store";
import { useNavigate, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import { ValidationLogin } from "../../../validations/salon/loginSalonValidation";
import { SalonLoginInterfaces } from "../../../interfaces/salon/salonLoginInterfaces";

const SalonLogin: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading } = useSelector((state: RootState) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

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
      } catch (error: any) {
        console.error("Login failedxcxcx:", error);
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error,
        });
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen  bg-cover bg-center">
      <div className="flex flex-col md:flex-row items-center p-6">
        <div className="p-6 rounded shadow-md w-full max-w-md bg-gray-200">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-950">
            LogIn Your Salon Account
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

            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-gray-950 text-start"
              >
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...formik.getFieldProps("password")}
                className="w-full p-2 border border-gray-400 rounded mt-1 text-gray-950"
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223a11.055 11.055 0 00-1.66 3.656C2.453 12.11 4.825 16.5 12 16.5c2.245 0 4.09-.5 5.5-1.217M21 21l-1.682-1.682M3.98 8.223L21 21M9.878 9.878a3 3 0 014.244 4.244"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.432 5 12 5c3.87 0 7.07 2.43 8.542 5.458A10.97 10.97 0 0112 19.5a10.97 10.97 0 01-9.542-7.5z"
                    />
                  </svg>
                )}
              </span>
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
                Forgot Your Password? <span style={{ color: "black" }}>Click Here</span>
              </NavLink>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-full p-2 border border-gray-300 rounded-lg mt-1 bg-gradient-to-b from-green-500 via-green-700 to-green-900   text-white"
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
