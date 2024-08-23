import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../../../CSS/signup.css";
import { Button } from "@nextui-org/react";
import { GUserLogin } from "../../../interfaces/user/UserLogin";
import { validateSignup } from "../../../validations/user/formi";
import { GoogleLogin } from "@react-oauth/google";
import { NavLink } from "react-router-dom";

function UserLogin() {
  const initialValues: GUserLogin = {
    email: "",
    password: "",
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <section>
      <div className="flex min-h-screen max-w-full">
        <div className="w-full flex justify-center items-center">
          <div className="bg-blue-300 p-6 sm:p-8 md:p-10 lg:p-12 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-8 text-center">Login</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validateSignup}
              onSubmit={() => {}}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className="w-full">
                  <div className="mb-4">
                    <Field
                      id="signup-input"
                      type="email"
                      placeholder="Enter Email"
                      className={`form-control ${
                        errors.email && touched.email ? "is-invalid" : ""
                      }`}
                      name="email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger text-smaller"
                    />
                  </div>

                  <div className="mb-4 relative">
                    <Field
                      id="signup-input"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password"
                      className={`form-control ${
                        errors.password && touched.password
                          ? "is-invalid"
                          : ""
                      }`}
                      name="password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger text-smaller"
                    />
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
                      {showPassword ?  "👁️" :"🙈" }
                    </label>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      radius="full"
                      className="bg-green-700 text-white h-8 w-10/12 rounded-md"
                      disabled={isSubmitting}
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
                        console.log(credentialResponse);
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
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserLogin;
