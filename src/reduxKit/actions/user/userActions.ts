import { FormValueOtp } from "./../../../interfaces/user/FormValueOtp";

import { UserSignupdata } from "./../../../interfaces/user/UserSignupdata";
import { IUserResendOtp } from "../../../interfaces/user/IUserResendOtp";
import { UserLogin } from "../../../interfaces/user/UserLogin";

import { createAsyncThunk } from "@reduxjs/toolkit";

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
      console.log(
        otp,
        email,
        userName,
        password,
        role,
        "these are my verify otp sendign data to backend "
      );
      const { data } = await axios.post(
        `${URL}/verify-otp`,
        {
          otp,
          email,
          userName,
          password,
          role,
        },
        config
      );
      console.log(
        data.data,
        "here data inside after verify-otp asyn thunk the result "
      );
      return data.data;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("ERROR WHIL VERIFYING OTP : ", error);
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue({ message: "Something went wrong!" });
      }
    }
  }
);

export const googleLoginOrSignUp = createAsyncThunk(
  "user/loginWithGoogle",
  async (userCredentials: UserLogin, { rejectWithValue }) => {
    try {
      console.log("inside signup action");
      console.log(userCredentials, "dat before theater signup");

      const { data } = await axios.post(
        `${URL}/google`,
        userCredentials,
        config
      );
      return data.data;

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

export const loginUser = createAsyncThunk(
  "user/userLogin",
  async (userCredentials: UserLogin, { rejectWithValue }) => {
    try {
      console.log("user action got ");

      const { data } = await axios.post(
        `${URL}/login`,
        userCredentials,
        config
      );
      console.log(data.data, "this is data form back end after axios post ");
      return data.data;
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

export const resendOTP = createAsyncThunk(
  "user/resendOTP",
  async (userResendDetails: IUserResendOtp, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${URL}/resend-otp`,
        userResendDetails,
        config
      );

      return data;
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

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${URL}/forgetPassword`,
        { email },
        config
      );
      console.log("🚀 ~ inside forget password data from backend", data);
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue("Failed to reset password");
    }
  }
);


export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      console.log('data vann deleet akkaaa ');
      axios.delete(`${URL}/logout`, config);
      return;
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
