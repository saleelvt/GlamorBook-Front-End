import { FormValueOtp } from "./../../../interfaces/user/FormValueOtp";

import { UserSignupdata } from "./../../../interfaces/user/UserSignupdata";

import { createAsyncThunk,  } from "@reduxjs/toolkit";

import axios from "axios";
import { URL, config } from "../../../config/constants";

export const signUpUser = createAsyncThunk(
  "user/signupUser",
  async (userCredentials: UserSignupdata, { rejectWithValue }) => {
    try {
      console.log("inside of the signup action ");
      console.log("my user credentiolas ", userCredentials);
      const response = await axios.post(
        `${URL}/signup`,
        userCredentials,
        config
      );
      console.log(
        "here data inidde of after signup the result ",
        response.data
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data);
        }
      }
      return rejectWithValue({ message: "Something went wrong..!" });
    }
  }
);

// Verify otp

export const verifyOTP = createAsyncThunk(
  "user/verifyOTP",
  async (
    { otp, email, userName, password, role }: UserSignupdata & FormValueOtp,
    { rejectWithValue }
  ) => {
    try {
      console.log(otp,email,userName,password,role,'these are my verify otp sendign data to backend ');
      const {data}=await axios.post(
        `${URL}/verify-otp`,
        {
          otp,email,userName,password,role,
        },
        config
      )
      console.log(
        data.data,
        "here data inside after verify-otp asyn thunk the result "
      );
      return data.data
      
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      console.error("ERROR WHIL VERIFYING OTP : ", error);
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue({ message: "Something went wrong!" });
      }

      
      
    }
  }
);
