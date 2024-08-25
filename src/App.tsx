import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import UserSignup from "./components/Forms/user/UserSignUp";
import UserLoginForm from "./components/Forms/user/UserLoginForm";
import UserForgotPassword from "./components/Forms/user/ForgetPassword";
import UserWelcomePage from "./components/pages/user/userWelcomePage";
import UserEmailVerify from "./components/Forms/user/UserEmailVerify";
import UserHomepage from "./components/pages/user/userHomepage";
import AdminHomePage from "./components/pages/admin/adminHomePage";
import { Toaster } from "react-hot-toast";
import { RootState } from "./reduxKit/store";
import { useSelector } from "react-redux";

function App() {
  const role = useSelector((state: RootState) => state.user?.userDetails?.role);
  if (role === "user" && role !== undefined && role !== null) {
    return (
      <Fragment>
         <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<UserWelcomePage />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/login" element={<UserLoginForm />} />
          <Route path="/userForgot" element={<UserForgotPassword />} />
          <Route path="/UserEmailverify" element={<UserEmailVerify />} />
          <Route path="/userHomepage" element={<UserHomepage />} />
          <Route path="/adminHomePage" element={<AdminHomePage />} />
        </Routes>
      </Fragment>
    );
  }
}

export default App;
