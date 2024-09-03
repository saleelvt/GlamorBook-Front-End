import  { Fragment } from "react";
import { Routes, Route} from "react-router-dom";
import UserSignup from "./components/Forms/user/UserSignUp";
import UserLoginForm from "./components/Forms/user/UserLoginForm";
import UserForgotPassword from "./components/Forms/user/ForgetPassword";
import UserWelcomePage from "./components/pages/user/userWelcomePage";
import UserEmailVerify from "./components/Forms/user/UserEmailVerify";
import UserHomepage from "./components/pages/user/userHomepage";
import UserResetPassword from "./components/pages/user/userResetPassword";

import AdminHomePage from "./components/pages/admin/adminHomePage";
import AdminLogin from "./components/Forms/admin/adminLoginPage";

import SalonHomePage from "./components/pages/salon/salonHomePage";
import SalonSignUp from "./components/Forms/salon/salonSignup";
import SalonLogin from "./components/Forms/salon/salonLogin";
import SalonOtpVerify from "./components/pages/salon/salonOtpVerify";
import SalonForgotPassword from "./components/Forms/salon/forgotPassword";
import SalonResetPassword from "./components/pages/salon/salonResetPassword";

import { Toaster } from "react-hot-toast";
import { RootState } from "./reduxKit/store";
import { useSelector } from "react-redux";

function App() {
  const { role, isLogged } = useSelector((state: RootState) => state.auth);

  console.log(
    "this is the main role of the roleres ",
    role,
    "this si sthe loged or not ",
    isLogged
  );

  return (
    <Fragment>
      <Toaster position="top-center" />

      <Routes>







        {/* <Route path="/" element={isLogged? <Navigate to={'/userHomepage'}/> : <UserWelcomePage />} /> */}
        <Route path="/" element={<UserWelcomePage />} />
        {/* <Route path="/signup" element={isLogged? <Navigate to={'/userHomepage'}/> : <UserSignup />} /> */}
        <Route path="/signup" element={<UserSignup />} />
        {/* <Route path="/login" element={isLogged? <Navigate to={'/userHomepage'}/> : <UserLoginForm />} /> */}
        <Route path="/login" element={<UserLoginForm />} />
        {/* <Route path="/userForgot" element={isLogged? <Navigate to={'/userHomepage'}/> : <UserForgotPassword />} /> */}
        <Route path="/userForgot" element={<UserForgotPassword />} />
        {/* <Route path="/UserEmailverify" element={isLogged? <Navigate to={'/userHomepage'}/> : <UserEmailVerify />} /> */}
        <Route path="/UserEmailverify" element={<UserEmailVerify />} />
        {/* <Route path="/userHomepage" element={isLogged && role === "user" ? <UserHomepage /> : <Navigate to={'/'}/>} /> */}
        <Route path="/userHomepage" element={<UserHomepage />} />
        <Route path="/userResetPassword" element={<UserResetPassword />} />










        <Route path="/salonLogin" element={<SalonLogin />} />
        <Route path="/salonHome" element={<SalonHomePage />} />
        <Route path="/salonSignUp" element={<SalonSignUp />} />
        <Route path="/salonOtpVerify" element={<SalonOtpVerify />} />
        <Route path="/forgotPassword" element={<SalonForgotPassword />} />
        <Route path="/salonResetPassword" element={<SalonResetPassword />} />


















        <Route path="/adminHomepage" element={<AdminHomePage />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
      </Routes>
    </Fragment>
  );
}

export default App;
