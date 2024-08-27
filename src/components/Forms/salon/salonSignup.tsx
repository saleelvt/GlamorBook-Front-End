// // store/actions/theaterActions.ts
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { URL, config } from "../../../config/constants";
// import { TheaterEntity } from "../../../interfaces/theater/Theaterinterface";
// import { FormValuesOTP } from "../../../interfaces/user/FormValuesOTP";
// import { UpdateTheaterDetailsPayload } from "../../../interfaces/theater/UpdateTheaterDetailsPayload";
// import ImageUpload from "../../../component/imageUpoad/ImageUpload";

// export const signUpTheater = createAsyncThunk(
//   "theater/signUpTheater",
//   async (theaterOwnerCredentials: TheaterEntity, { rejectWithValue }) => {
//     try {
//       console.log("inside theater signup action");

//       console.log(theaterOwnerCredentials, "dat before theater signup");

//       const { data } = await axios.post(
//         `${URL}/theater/signup`,
//         theaterOwnerCredentials,
//         config
//       );

//       console.log(data, "data after theater signup ");

//       return data;
//     } catch (error: any) {
//       if (error.response && error.response.data) {
//         return rejectWithValue(error.response.data);
//       } else {
//         return rejectWithValue({ message: "Something went wrong!" });
//       }
//     }
//   }
// );

// export const loginTheater = createAsyncThunk(
//   "theater/loginTheater",
//   async (
//     loginCredentials: { email: string; password: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       console.log("inside theater login action");

//       console.log(loginCredentials, "here in theater login data");

//       const { data } = await axios.post(
//         `${URL}/theater/login`,
//         loginCredentials,
//         config
//       );

//       console.log(data.data, "here in theater after login data");

//       return data.data;
//     } catch (error: any) {
//       if (error.response && error.response.data) {
//         return rejectWithValue(error.response.data);
//       } else {
//         return rejectWithValue({ message: "Something went wrong!" });
//       }
//     }
//   }
// );

// export const verifyTheaterOtp = createAsyncThunk(
//   "theater/verifyTheaterOtp",
//   async (
//     { otp, email, username, password, role, status }: TheaterEntity & FormValuesOTP,
//     { rejectWithValue }
//   ) => {
//     try {
//       console.log(
//         otp,
//         email,
//         username,
//         password,
//         role,
//         status,
//         "here data inside verify otp sending to backend"
//       );

//       const { data } = await axios.post(
//         `${URL}/theater/verify-otp`,
//         {
//           otp,
//           email,
//           username,
//           password,
//           role,
//           status,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log(
//         data.data,
//         "here data inside after verify-otp async thunk result"
//       );

//       return data.data;
//     } catch (error: any) {
//       if (error.response && error.response.data) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue({ message: "Something went wrong!" });
//       }
//     }
//   }
// );



// export const updateTheaterDetails = createAsyncThunk(
//   "theater/updateTheaterDetails",
//   async (
//     {
//       theaterId,
//       username,
//       email,
//       oldPassword,
//       password,
//       profilePic,
//       city, 
//     }: UpdateTheaterDetailsPayload,
//     { rejectWithValue }
//   ) => {
//     try {
//       let profilePicUrl = null;
//       if (profilePic) {
//         profilePicUrl = await ImageUpload(profilePic);
//       }

//       const updatedTheaterData: Partial<TheaterEntity> = {
//         username,
//         email,
//         ...(oldPassword && { oldPassword }),
//         ...(password && { password }),
//         ...(profilePicUrl && { profilePicture: profilePicUrl }),
//         ...(city && { city }),
//       };

//       const { data } = await axios.put(
//         `${URL}/theater/updateTheater/${theaterId}`,
//         updatedTheaterData,
//         config
//       );

//       return data.theater;
//     } catch (error: any) {
//       if (error.response && error.response.data) {
//         return rejectWithValue(error.response.data.message);
//       } else {
//         return rejectWithValue({ message: "Something went wrong!" });
//       }
//     }
//   }
// );


// export const theaterForgetPassword=createAsyncThunk(
//   'theater/forgetpassword',
//   async(email:string,{rejectWithValue})=>{

//     try {
//       const { data } = await axios.post(
//         `${URL}/theater/forgetpassword`,
//         { email },
//         config
//       );

//       console.log("🚀 ~ inside theater forget password data from backend", data);
//       return data;
//     } catch (error:any) {
//       return rejectWithValue("Failed to reset password");
//     }
//   }
// )


// export const logoutTheater = createAsyncThunk(
//   "theater/logout",
//   async (_, { rejectWithValue }) => {
//     try {
//      const { data } = await axios.delete(`${URL}/theater/logout`, config);
//       return data;
//     } catch (error: any) {
//       if (error.response && error.response.data) {
//         return rejectWithValue(error.response.data);
//       } else {
//         return rejectWithValue({ message: "Something went wrong!" });
//       }
//     }
//   }
// );

