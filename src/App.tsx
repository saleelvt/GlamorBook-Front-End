import React, { Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UserSignup from "./components/Forms/user/UserSignUp";
import UserLoginForm from "./components/Forms/user/UserLoginForm";
import UserForgotPassword from "./components/Forms/user/ForgetPassword";
import UserWelcomePage from "./components/pages/user/userWelcomePage";
import UserEmailVerify from "./components/Forms/user/UserEmailVerify";
import UserHomepage from "./components/pages/user/userHomepage";
import AdminHomePage from "./components/pages/admin/adminHomePage";
import AdminLogin from "./components/Forms/admin/adminLoginPage";
import SalonHomePage from "./components/pages/salon/salonHomePage";
import SalonSignUp from "./components/Forms/salon/salonSignup";
import SalonLogin from "./components/Forms/salon/salonLogin";
import { Toaster } from "react-hot-toast";
import { RootState } from "./reduxKit/store";
import { useSelector } from "react-redux";

function App() {
  const { role, isLogged } = useSelector((state: RootState) => state.auth);
  
  return (

    <Fragment>
      <Toaster position="top-center" />
      <Routes>

      

        <Route path="/" element={isLogged? <Navigate to={'/userHomepage'}/> : <UserWelcomePage />} />
        <Route path="/signup" element={isLogged? <Navigate to={'/userHomepage'}/> : <UserSignup />} />
        <Route path="/login" element={isLogged? <Navigate to={'/userHomepage'}/> : <UserLoginForm />} />
        <Route path="/userForgot" element={isLogged? <Navigate to={'/userHomepage'}/> : <UserForgotPassword />} />
        <Route path="/UserEmailverify" element={isLogged? <Navigate to={'/userHomepage'}/> : <UserEmailVerify />} />
        <Route path="/userHomepage" element={isLogged && role === "user" ? <UserHomepage /> : <Navigate to={'/'}/>} />




        <Route path="/salonLogin" element={<SalonLogin />} />
        <Route path="/salonHome" element={<SalonHomePage />} />
        <Route path="/salonSignUp" element={<SalonSignUp />} />








        <Route path="/adminHomepage" element={isLogged && role === "admin" ? <AdminHomePage /> : <Navigate to={'/admin/Login'}/>} />
        <Route path="/admin/login" element={isLogged && role === "admin"? <Navigate to={'/adminHompage'}/> : role === "user"? <Navigate to={'/userHomepage'} /> : <AdminLogin /> } />
      </Routes>
    </Fragment>
  );

}

export default App;
