// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import LoginPage from "./pages/user/LoginPage";
// import RegisterPage from "./pages/user/RegisterPage";
// import { useAppDispatch, useAppSelector } from "./redux/store";
// import EmailVerification from "./pages/EmailVerification";
// import { FC, useContext, useEffect, useState } from "react";
// import { getUserData } from "./redux/actions/userActions";
// import AddProperty from "./pages/host/AddProperty";
// import "./App.css"
// import IndexPage from "./pages/IndexPage";
// import HostDashboard from "./pages/host/HostDashboard";
// import HostLayout from "./pages/host/HostLayout";
// import UserLayout from "./pages/user/UserLayout";
// import AboutPage from "./pages/public/AboutPage";
// import { IUserSignupData } from "./interface/IUserSignup";
// import PublicLayout from "./pages/public/PublicLayout";
// import AuthLayout from "./pages/auth/AuthLayout";
// import AllProperties from "./pages/public/AllProperties";
// import ManageListing from "./components/host/ManageListing";
// import LoadingSpinner from "./pages/LoadingSpinner";
// import ShowDescriptionHostProperty from "./pages/host/ShowDescriptionHostProperty";
// import ShowPriceHostProperty from "./pages/host/ShowPriceHostProperty";

// import ForgotPasswordNewPage from "./pages/auth/ForgotPasswordNewPage";
// import ResetPassword from "./pages/auth/ResetPassword";
// import ShowbedroomsHostProperty from "./pages/host/ShowBedroomsHostProperty";
// import { HostPropertySingleContext } from "./context/HostPropertySingleContext";
// import ShowbathroomsHostProperty from "./pages/host/ShowBathroomsHostProperty";
// import SinglePropertyDetailedLayout from "./pages/host/SinglePropertyDetailedLayout";
// import ShowPhotosHostProperty from "./pages/host/ShowPhotosHostProperty";
// import ShowTitleHostProperty from "./pages/host/ShowTitleHostProperty";
// import ShowMaxGuestsHostProperty from "./pages/host/ShowMaxGuestsHostProperty";
// import UserProfilePage from "./pages/user/UserProfilePage";
// import Dashboard from "./pages/admin/Dashboard";
// import Users from "./pages/admin/components/Users";
// import Hosts from "./pages/admin/Hosts";
// import Listing from "./pages/admin/Listing";
// import DashboardIndex from "./pages/admin/DashboardIndex";
// import PreviewPropertyAdmin from "./pages/admin/components/PreviewPropertyAdmin";
// import Subscription from "./pages/admin/components/Subscription";
// import SubscriptionPaymentSuccessPage from "./pages/user/SubscriptionPaymentSuccessPage";
// import BookingPaymentSuccessful from "./pages/user/checkout/BookingPaymentSuccessful";
// import BookingDetails from "./pages/user/booking/BookingDetails";
// import Property from "./pages/admin/Property";
// import ChatsPage from "./pages/host/message/pages/ChatsPage";
// import VideoCallPage from "./pages/user/chat/VideoCallPage";
// import HostReservation from "./pages/host/HostReservation";
// import SearchResult from "./pages/public/SearchResult";
// import Index from "./pages/public/propertyDetails/Index";

// interface IRoles {
//   [key: string]: string
// }
// interface IRoleBasedRedirectProps {
//   roles: IRoles,
//   user: IUserSignupData | null
// }


// function App() {
//   const dispatch = useAppDispatch()
//   const { user } = useAppSelector(state => state.user)
//   const [loading, setLoading] = useState(true);
//   const { hostProperty } = useContext(HostPropertySingleContext)
//   console.log("🚀 ~ App ~ user:", user)
//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (!user) {
//         await dispatch(getUserData())
//       }
//       setLoading(false);
//     }

//     fetchUserData()
//   }, [user])

//   const RoleBasedRedirect: FC<IRoleBasedRedirectProps> = ({ roles, user }) => {
//     console.log('inside rolebased redirect routes🥶🥶')
//     if (user && roles[user.role!]) {
//       console.log('inside rolebased redirect iiiiiiiffffffff routes🥶🥶')
//       return <Navigate to={roles[user.role!]} replace />
//     }

//     return <Navigate to="/index" replace />
//   }
//   if (loading) {
//     return <LoadingSpinner />
//   }
//   const ProtectHostRoute = ({ element }: any) => {
//     console.log("🚀 ~ ProtectHostRoute ~ element:", element)

//     console.log("🚀 ~ ProtectHostRoute ~ user:", user)

//     return user && user?.role === 'host' ? element : <Navigate to="/index" replace />
//   }

//   const ProtectedAdminRoute = ({ element }: any) => {
//     console.log('inside protect routes🥶🥶')
//     const { user } = useAppSelector((state) => state.user)
//     return user && user?.role === 'admin' ? element : <Navigate to="/index" />;
//   }
//   const isAdminRoute = ({ element }: any) => {
//     console.log('inside protect routes🥶🥶')
//     const { user } = useAppSelector((state) => state.user)
//     return user && user?.role === 'admin' ? element : <Navigate to="/index" />;
//   }

//   const ProtectedRoute = ({ element }: any) => {
//     console.log('inside protect routes🥶🥶')
//     const { user } = useAppSelector((state) => state.user)
//     return user ? element : <Navigate to="/index" />;
//   }


//   return (
//     <Router >
//       <Routes>
//         <Route path="/"
//           element={
//             <RoleBasedRedirect roles={{
//               admin: '/admin'
//             }}
//               user={user} />}
//         />
//         <Route path="/admin/*" element={<ProtectedAdminRoute element={<AdminRoutes />} />} />
//         {/* </Route> */}
//         {/* Auth pages */}
//         <Route path="/auth/*" element={<AuthRoutes />} />

//         {/* general pages */}
//         <Route path="/index/*" element={<PublicRoutes />} />

//         {/* Host Routes */}
//         <Route path="/host/*" element={<ProtectHostRoute element={<HostRoutes />} />} />

//         {/* Admin routes */}

//         {/* User Routes */}
//         {/* <Route path="/user/*" element={<ProtectedRoute element={<UserRoutes/>} />} /> */}
//         <Route path="/user/*" element={<ProtectedRoute element={<UserRoutes />} />} />
//       </Routes>
//     </Router>
//   )

// }

// export default App;
// const AdminRoutes: FC = () => {
//   console.log('inside admin routes')
//   return (
//     <Routes>
//       <Route path="/" element={<Dashboard />} >
//         <Route index element={<Navigate to={'/admin/dashboard'} />} />
//         <Route path="dashboard" element={<DashboardIndex />} />
//         <Route path="hosts" element={<Hosts />} />
//         <Route path="users" element={<Users />} />
//         <Route path="listing" element={<Listing />} />
//         <Route path="listing/preview" element={<PreviewPropertyAdmin />} />
//         <Route path="subscription" element={<Subscription />} />
//         <Route path="property" element={<Property />} />
//       </Route>
//     </Routes>
//   )
// }

// const HostRoutes: FC = () => {
//   return (
//     <Routes>

//       <Route path="/" element={<HostLayout />} >
//         <Route index element={<Navigate to="/host/dashboard" />} />
//         <Route path="/add-property" element={<AddProperty />} />
//         <Route path="/dashboard" element={<HostDashboard />} />


//         <Route path="/manage-listing" element={<ManageListing />} />
//         <Route path="/manage-listing/:propertyId" element={<SinglePropertyDetailedLayout />}>
//           <Route index element={<Navigate to="photos" />} />
//           <Route path="photos" element={<ShowPhotosHostProperty />} />
//           <Route path="title" element={<ShowTitleHostProperty />} />
//           <Route path="description" element={<ShowDescriptionHostProperty />} />
//           <Route path="price" element={<ShowPriceHostProperty />} />
//           {/* <Route path="amenities" element={<ShowAmenitiesHostProperty />} /> */}
//           <Route path="bathrooms" element={<ShowbathroomsHostProperty />} />
//           <Route path="bedrooms" element={<ShowbedroomsHostProperty />} />
//           <Route path="max-guests" element={<ShowMaxGuestsHostProperty />} />
//           <Route path="house-rules" element={""} />

//           {/* <Route path="details" element={<HostPropertyDetail />} >
//           </Route> */}

//         </Route>
//         <Route path="/reservations" element={<HostReservation />} />

//         <Route path="/reviews" element={""} />
//         <Route path="/earnings" element={""} />
//         <Route path="/Account" element={""} />
//       </Route>
//     </Routes>
//   )
// }

// const UserRoutes: FC = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<UserLayout />} >
//         <Route path="/profile" element={<UserProfilePage />}>
//         </Route>
//         <Route path="/message" element={<ChatsPage />} />
//         <Route path="/bookings/:bookingId" element={<BookingDetails />} />
//         <Route path="/paymentSuccess/:session_id" element={<BookingPaymentSuccessful />} />
//         <Route path="/subscription-payment-succes/:session_id" element={<SubscriptionPaymentSuccessPage />} />
//         <Route path='/video-call' element={<VideoCallPage />} />

//       </Route>
//     </Routes>
//   )
// }

// const PublicRoutes: FC = () => {
//   const { user } = useAppSelector(state => state.user)
//   if (user?.role === 'admin') {
//     return <Navigate to={'/admin'} />
//   }
//   return (
//     <Routes>
//       <Route path="/" element={<PublicLayout />} >
//         <Route index element={<Navigate to="/index/home" replace />} />
//         <Route path="/home" element={<IndexPage />} />
//         <Route path="/properties" element={<AllProperties />} />
//         <Route path="/properties/:propertyId" element={<Index />} />

//         {/* <Route path="/properties/:propertyId/checkout" element={<CheckoutPage />} /> */}
//         <Route path="/about" element={<AboutPage />} />
//         <Route path="/admin" element={<Dashboard />} />
//         <Route path="/searchResult" element={<SearchResult />} />
//       </Route>

//     </Routes>
//   )
// }

// const AuthRoutes: FC = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<AuthLayout />} >
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<RegisterPage />} />
//         <Route path="/forgot-password" element={<ForgotPasswordNewPage />} />
//         <Route path="/reset-password/:token" element={<ResetPassword />} />
//         <Route path="/verify-account" element={<EmailVerification />} />
//       </Route>
{/* <Routers/> */}

