import { useState } from "react";
import { useFormik } from "formik";
import "../../../CSS/signup.css";
import { Button } from "@nextui-org/react"; // Importing NextUI Button
import { UserSignupdata } from "../../../interfaces/user/UserSignupdata";
import { validateSignup } from "../../../validations/user/formi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../reduxKit/store";
import { signUpUser } from "../../../reduxKit/actions/user/userActions";

import Swal from "sweetalert2";

const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  type CustomError = {
    response?: {
      data?: {
        message?: string;
      };
    };
  };

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik<UserSignupdata>({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "user",
    },

    validationSchema: validateSignup,
    onSubmit: (values) => {
      dispatch(signUpUser(values))
        .unwrap()
        .then(() => {
          navigate("/UserEmailverify");
        })
        .catch((error: CustomError) => {
          console.error("Signup failed:", error);
          Swal.fire({
            icon: "error",
            title: "Signup failed",
            text:
              error.response?.data?.message || "An unexpected error occurred",
          });
        });
    },
  });

  return (
    <section>
      <div className="flex min-h-screen max-w-full">
        <div className="w-full flex justify-center items-center">
          <div className="bg-gray-200 p-6 sm:p-8 md:p-10 lg:p-12 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center">Signup</h2>
            <form onSubmit={formik.handleSubmit} className="w-full">
              <div className="mb-4">
                <input
                  id="names-input"
                  type="text"
                  placeholder="Name"
                  className={`form-control ${
                    formik.errors.userName && formik.touched.userName
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("userName")}
                />
                {formik.touched.userName && formik.errors.userName ? (
                  <div className="text-danger text-smaller">
                    {formik.errors.userName}
                  </div>
                ) : null}
              </div>

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
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-danger text-smaller">
                    {formik.errors.email}
                  </div>
                ) : null}
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
                  {...formik.getFieldProps("password")}
                />
                <label
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  {showPassword ? "👁️" :"🙈"}
                </label>
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-danger text-smaller">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>

              <div className="mb-4 relative">
                <input
                  id="signup-input"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className={`form-control ${
                    formik.errors.confirmPassword &&
                    formik.touched.confirmPassword
                      ? "is-invalid"
                      : ""
                  }`}
                  {...formik.getFieldProps("confirmPassword")}
                />
                <label
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                >
                  {showConfirmPassword ?  "👁️" :"🙈"}
                </label>
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <div className="text-danger text-smaller">
                    {formik.errors.confirmPassword}
                  </div>
                ) : null}
              </div>

              <div className="form-group flex items-center mb-4">
                <input type="checkbox" {...formik.getFieldProps("terms")} />
                <label id="terms-ptag" className="ml-2">
                  I agree to all the <span className="text-red-500">Terms</span>{" "}
                  and <span className="text-red-500">Privacy Policies</span>
                </label>
              </div>

              <Button
                type="submit"
                radius="full"
                className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg w-full py-2 rounded-md"
                disabled={formik.isSubmitting}
              >
                Create Account
              </Button>
              <p className="text-center">
                Already have an account?{" "}
                <Button
                  onClick={() => navigate("/login")}
                  style={{ color: "blue" }}
                >
                  Login
                </Button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
