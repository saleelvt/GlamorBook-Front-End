import { useState } from "react";
import { useFormik } from "formik";
import "../../../CSS/signup.css";
import { Button } from "@nextui-org/react";
import { UserLogin } from "../../../interfaces/user/UserLogin";
import { AppDispatch } from "../../../reduxKit/store";
import Swal from "sweetalert2";
// import { validateSignup } from "../../../validations/user/formi";
import { GoogleLogin } from "@react-oauth/google";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  googleLoginOrSignUp,
  loginUser,
} from "../../../reduxKit/actions/auth/authActions";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const initialValues: UserLogin = {
    email: "",
    password: "",
  };

  
  // Handle Google login
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const loginWithGoogle = async (data: any) => {
    try {
      await dispatch(googleLoginOrSignUp(data)).unwrap();
      navigate("/userHomepage", {
        state: {
          email: data.email,
          role: "user",
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Google Login failed:", err);
      Swal.fire({
        showConfirmButton: false,
        toast: true,
        timerProgressBar: true,
        timer: 1500,
        icon: "error",
        title: "Google Login failed",
        text: err.response?.data?.message || "An unexpected error occurred",
      });
    }
  };

  // Initialize Formik
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      let hasError = false;
      if (!values.email) {
        setEmailError("Email is required");
        hasError = true;
      } else {
        setEmailError("");
      }

      if (!values.password) {
        setPasswordError("Password is required");
        hasError = true;
      } else if (values.password.length < 5) {
        setPasswordError("Password must be at least 6 characters");
        hasError = true;
      } else {
        setPasswordError("");
      }
      console.log("Form submitted with values:", values);

      if (!hasError) {
        dispatch(loginUser(values))
          .unwrap()
          .then(() => {
            navigate("/userHomepage");
          })
          .catch((error) => {
            console.error("Login failed:", error);
            Swal.fire({
              icon: "error",
              title: "Login failed",
              text:
                error.response?.data?.message || "An unexpected error occurred",
            });
          });
      }
    },
  });

  return (
    <section>
      <div className="flex min-h-screen max-w-full">
        <div className="w-full flex justify-center items-center">
          <div className="bg-blue-300 p-6 sm:p-8 md:p-10 lg:p-12 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-8 text-center">Login</h2>

            <form onSubmit={formik.handleSubmit} className="w-full">
              <div className="mb-4">
                <input
                  id="signup-input"
                  type="email"
                  placeholder="Enter Email"
                  className={`form-control ${
                    formik.errors.email && formik.touched.email
                      ? "is-invalid"
                      : ""
                  }`}
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email ?? ""}
                />

                {emailError && (
                  <p className="text-danger text-smaller">{emailError}</p>
                )}
              </div>

              <div className="mb-4 relative">
                <input
                  id="signup-input"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className={`form-control ${
                    formik.errors.password && formik.touched.password
                      ? "is-invalid"
                      : ""
                  }`}
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password ?? ""}
                />
                {passwordError && (
                  <p className="text-danger text-smaller">{passwordError}</p>
                )}
                <label
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "35%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? "👁️" : "🙈"}
                </label>
              </div>

              <div className="flex justify-center">
                <Button
                  type="submit"
                  radius="full"
                  className="bg-green-700 text-white h-8 w-10/12 rounded-md"
                  disabled={formik.isSubmitting}
                >
                  Login
                </Button>
              </div>

              <div className="flex justify-center mt-2">
                <NavLink to="/userForgot" style={{ color: "red" }}>
                  Forgot Password
                </NavLink>
              </div>

              <div className="flex justify-center mt-4">
                <GoogleLogin
                  text="signin_with"
                  shape="circle"
                  onSuccess={(credentialResponse) => {
                    console.log("this is my credential ", credentialResponse);
                    loginWithGoogle(credentialResponse);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </div>

              <div className="mt-4 text-center">
                <span className="text-gray-950">
                  Don't have an account?{" "}
                  <NavLink to="/signup" style={{ color: "blue" }}>
                    Sign Up
                  </NavLink>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
