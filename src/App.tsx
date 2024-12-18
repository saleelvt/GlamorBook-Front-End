/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UserSignup from "./components/Forms/user/UserSignUp";
import UserLoginForm from "./components/Forms/user/UserLoginForm";
import UserForgotPassword from "./components/Forms/user/ForgetPassword";
import UserWelcomePage from "./components/pages/user/userWelcomePage";
import UserEmailVerify from "./components/Forms/user/UserEmailVerify";
import UserHomepage from "./components/pages/user/userHomepage";
import UserResetPassword from "./components/pages/user/userResetPassword";
import { SalonProfilePage } from "./components/pages/salon/salonProfile";
import AddServiceForm from "./components/pages/salon/addService";
import ChatWindow from "./components/Chat/ChatWindow";

import AdminHomePage from "./components/pages/admin/adminHomePage";
import AdminLogin from "./components/Forms/admin/adminLoginPage";
import AdminSalonList from "./components/pages/admin/adminSalonList";
import SalonDetailsPage from "./components/pages/admin/salonDetailsPage";
import  SalonServiceList  from "./components/pages/salon/salonServiceList";

import SalonHomePage from "./components/pages/salon/salonHomePage";
import SalonSignUp from "./components/Forms/salon/salonSignup";
import SalonLogin from "./components/Forms/salon/salonLogin";
import SalonOtpVerify from "./components/pages/salon/salonOtpVerify";
import SalonForgotPassword from "./components/Forms/salon/forgotPassword";
import SalonResetPassword from "./components/pages/salon/salonResetPassword";
import UserSalonDetailsPage from "./components/pages/user/userSalonDetails";



import { Toaster } from "react-hot-toast";
import {  RootState ,ExtendedAppDispatch } from "./reduxKit/store";
import { useSelector } from "react-redux";
// import { fetchUserStatus } from "./reduxKit/actions/auth/authActions";
import { useDispatch } from "react-redux";
import { commonRequest } from "./config/api";
import { config } from "./config/constants";

// Helper function for role-based redirects

const getRoleBasedRedirect = (isLogged: boolean, role: string | null) => {
  if (!isLogged) return <UserWelcomePage />;

  switch (role) {
    case 'user':
      return <Navigate to="/userHomepage" />;
    case 'salon':
      return <Navigate to="/salonHome" />;
    case 'admin':
      return <Navigate to="/adminHomepage" />;
    default:
      return <UserWelcomePage />;
  }
};

function App() {
  // Getting state from redux store
  const { role, isLogged ,userData } = useSelector((state: RootState) => state.auth);
  const dispatch=useDispatch<ExtendedAppDispatch>()
  const [status,setStatus]= useState<any>(null)
  if(status){
  console.log('saleelisa gogot',status);
  }
const  userId :any =userData?._id

  useEffect(() => {
    const fetchStatus = async () => {
      if ((role === 'user' || role === 'salon') && userId) {
        try {
          console.log("ia ma going to fetch the status",role,userId);
          const  response1 = await commonRequest("GET",`/getStatus/${userId}/${role}`,config)
          return  setStatus(response1.data.data)
        } catch (error) {
          console.error('Error fetching user status:', error);
        }
      }
    };
    fetchStatus();
  }, [dispatch, role]); 
  if(status){
    console.log('saleel macha nammale saanam kittiyada ini pooram ',status);
    } 
  return (
    <Fragment>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={getRoleBasedRedirect(isLogged, role)} />
        {/* User Routes */}
        <Route path="/signup" element={isLogged && role === 'user'  ? <Navigate to="/userHomepage" /> : <UserSignup />} />
        <Route path="/login" element={isLogged && role === 'user' ? <Navigate to="/userHomepage" /> : <UserLoginForm />} />
        <Route path="/userForgot" element={<UserForgotPassword />} />
        <Route path="/UserEmailverify" element={<UserEmailVerify />} />
        <Route path="/userHomepage" element={isLogged && role === 'user' ? <UserHomepage /> : <Navigate to="/" />} />
        <Route path="/salonDetails/:salonId" element={isLogged && role === 'user' ? <UserSalonDetailsPage /> : <Navigate to="/" />} />
        <Route path="/userResetPassword" element={<UserResetPassword />} />
        <Route path="/userChatPage" element={isLogged && role === 'user' || isLogged && role==="salon" ? <ChatWindow /> : <Navigate to="/" />} />
        
        {/* Salon Routes */}
        <Route path="/salonLogin" element={isLogged && role === 'salon' ? <Navigate to="/salonHome" /> : <SalonLogin />} />
        <Route path="/salonHome" element={isLogged && role === 'salon' ? <SalonHomePage /> : <Navigate to="/salonLogin" />} />
        <Route path="/salonSignUp" element={isLogged && role === 'salon' ? <SalonHomePage /> : <SalonSignUp />} />
        <Route path="/salonOtpVerify" element={isLogged && role === 'salon' ? <SalonHomePage /> : <SalonOtpVerify />} />
        <Route path="/forgotPassword" element={isLogged && role === 'salon' ? <SalonHomePage /> : <SalonForgotPassword />} />
        <Route path="/salonResetPassword" element={isLogged && role === 'salon' ? <SalonHomePage /> : <SalonResetPassword />} />
        <Route path="/salonProfile" element={isLogged && role === 'salon' ? <SalonProfilePage /> : <SalonLogin />} />
        <Route path="/salonServiceList" element={isLogged && role === 'salon' ? <SalonServiceList /> : <SalonLogin />} />
        <Route path="/addService" element={isLogged && role === 'salon' ? <AddServiceForm /> : <SalonLogin />} />
 
        {/* Admin Routes */}
        <Route path="/adminHomepage" element={isLogged && role === 'admin' ? <AdminHomePage /> : <AdminLogin />} />
        <Route path="/adminLogin" element={isLogged && role === 'admin' ? <Navigate to="/adminHomepage" /> : <AdminLogin />} />
        <Route path="/adminSalonList" element={isLogged && role === 'admin' ? <AdminSalonList /> : <AdminLogin />} />
        <Route path="/admin/salon/:salonId" element={isLogged && role === 'admin' ? <SalonDetailsPage /> : <AdminLogin />} />
      </Routes>
    </Fragment>
  );
}

export default App;
