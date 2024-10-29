/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SalonInterface } from "../../../interfaces/salon/salonInterface";
import axios from "axios";
import { URL, config } from "../../../config/constants";
// import { ServiceInterface } from "../../../interfaces/salon/serviceInterface";

export const signupSalon = createAsyncThunk(
  "salon/signup",
  async (salonOwnerCredentials: SalonInterface, { rejectWithValue }) => {
    try {
      console.log(
        "inside of the action  and my credential salon  and datats ",
        salonOwnerCredentials
      );

      const { data } = await axios.post(
        `${URL}/salon/signup`,
        salonOwnerCredentials,
        config
      );

      console.log("after salon axios post ", data);
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: "Something went wrong!" });
      }
    }
  }
);

export const salonOtpVerify = createAsyncThunk(
  "salon/otpverification",
  async (
    {
      otp,
      email,
      userName,
      password,
      role,
      status,
      city,
      images,
      latitude,
      longitude,
      licenseDocument,
      phone,
      profilePicture,
      seat,
      salonName,
      state,
    }: SalonInterface,
    { rejectWithValue }
  ) => {
    try {
      console.log(
        "verify otp data for sending to back end in friday it will be save in my back end data  ",
        otp,
        email,
        userName,
        password,
        role,
        status,
        city,
        images,
        latitude,
        longitude,
        licenseDocument,
        phone,
        profilePicture,
        seat,
        salonName,
        state
      );

      const { data } = await axios.post(
        `${URL}/salon/verify-otp`,
        {
          otp,
          email,
          userName,
          password,
          role,
          status,
          city,
          images,
          latitude,
          longitude,
          licenseDocument,
          phone,
          profilePicture,
          seat,
          salonName,
          state,
        },
        config
      );

      console.log("the data after verify axios ", data.data);

      return data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue({ message: "Something went wrong!" });
      }
    }
  }
);

export const salonForgotPassword = createAsyncThunk(
  "salon/forgotPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      console.log("the data befor the axios 1", email);

      const { data } = await axios.post(
        `${URL}/salon/forgotPassword`,
        { email },
        config
      );

      console.log(
        "🚀 ~ insidethsi datat after the axios post of the slaon  forget password data from backend",
        data
      );
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue("Failed to reset password");
    }
  }
);


export const SalonAddService = createAsyncThunk(
  "addService",
  async({_id,serviceName,price,duration}:any,{rejectWithValue})=>{
   
    try {
     console.log( 'goiing ot axios post hte ', _id,serviceName,price,duration);

     await axios.post(`${URL}/salon/addSalonService`,{_id,serviceName,price,duration},config)
     
    }  catch (error: any) {
      return rejectWithValue("Failed to reset password");
    }
  }
)


