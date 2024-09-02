import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { SalonInterface } from "../../../interfaces/salon/salonInterface";
import { ValidationSchema } from "../../../validations/salon/signupSalonValidation";
import { AppDispatch, RootState } from "../../../reduxKit/store";
import { signupSalon } from "../../../reduxKit/actions/salon/salonActions";
import { NavLink } from "react-router-dom";

const SalonSignUp: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.salon);

  const initialValues: SalonInterface = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "salon",
    status: "active",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: ValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(signupSalon(values)).unwrap();

        Swal.fire({
          icon: "success",
          title: "Signup Successful",
          text: "You have successfully signed up! Please verify your email to continue.",
          timer: 1500,
          showConfirmButton: false,
          toast: true,
          timerProgressBar: true,
        }).then(() => {
          navigate("/salonOtpVerify");
        });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Signup failed:", err);
        Swal.fire({
          icon: "error",
          toast: true,
          timer: 2500,
          title: "Signup Failed",
          text: err.message || "Email Already Existed",
        });
        setSubmitting(false);  // Ensure Formik stops submitting
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-pink-300 to-yellow-200">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl p-6">
        <div className="p-6 rounded shadow-md w-full bg-slate-200 max-w-md bg-white">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
            Create An Account (Salon)
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="userName"
                className="block text-gray-950 text-start"
              >
                Username
              </label>
              <input
                id="userName"
                type="text"
                {...formik.getFieldProps("userName")}
                className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-950"
              />
              {formik.touched.userName && formik.errors.userName ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.userName}
                </div>
              ) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-950 text-start">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...formik.getFieldProps("email")}
                className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-950"
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
                className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-950"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-950 text-start"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...formik.getFieldProps("confirmPassword")}
                className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-950"
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="w-full p-2 bg-gradient-to-tr from-pink-600 to-yellow-500  border border-gray-700 rounded-lg mt-1"
                disabled={formik.isSubmitting}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
              {error && (
                <div className="text-red-500 text-sm mt-2">{error}</div>
              )}
            </div>
          </form>
          <div className="mt-4 text-center">
            <span className="text-gray-950">
              Already have an account?{" "}
              <NavLink to="/salonLogin" style={{ color: "red" }}>
                Log in
              </NavLink>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonSignUp;
