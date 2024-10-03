import { UserLogin } from "../../../interfaces/user/UserLogin";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL, config } from "../../../config/constants";
import { IAdminLogin } from "../../../interfaces/admin/IAdminLogin";
import { SalonLoginInterfaces } from "../../../interfaces/salon/salonLoginInterfaces";

export const axiosIn = axios.create({
  baseURL: URL,
});

export const googleLoginOrSignUp  = createAsyncThunk(
  "user/loginWithGoogle",
  async (userCredentials: UserLogin, { rejectWithValue }) => {
    try {
      console.log("inside signup action");
      console.log(userCredentials, "dat before theater signup");

      const { data } = await axiosIn.post(`/google`, userCredentials, config);
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
      const { data } = await axiosIn.post(`/login`, userCredentials, config);
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








export const fetchUserStatus = createAsyncThunk(
  'user/RoleStatus',
  async (userCredentials:string,{rejectWithValue})=>{
    console.log("trying");
    
    try {
      console.log('going for fetch the status');
      const {data} = await axiosIn.post("/getStatus",userCredentials,config)
       console.log("this is the data after get after user staus got " ,data );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({ message: "Something went wrong!" });
      }
    }
  })

















export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      console.log("data vann deleet akkaaa ");
      axiosIn.delete(`/logout`, config);
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

export const loginAdmin = createAsyncThunk(
  "admin/loginAdmin",
  async (adminCredentials: IAdminLogin, { rejectWithValue }) => {
    try {
      console.log(
        "admin action got this si smy credential  ",
        adminCredentials
      );
      const { data } = await axiosIn.post(
        `/admin/login`,
        adminCredentials,
        config
      );
      console.log(data.data, "admin login response data");
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

export const adminLogout = createAsyncThunk(
  "admin/logout",

  async (__, { rejectWithValue }) => {
    try {
      axiosIn.delete(`admin/logout`, config);

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

export const loginSalon = createAsyncThunk(
  "salon/login",
  async (salonCredentials: SalonLoginInterfaces, { rejectWithValue }) => {
    try {
      console.log("salon credential ", salonCredentials);

      const { data } = await axiosIn.post(
        "/salon/login",
        salonCredentials,
        config
      );
      console.log("salon data  tot maxha", data.data);
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

export const salonLogout = createAsyncThunk(
  "salon/logout ",
  async (__, { rejectWithValue }) => {
    try {
      console.log('slaon will going to logout ');
      
      await axiosIn.delete("salon/logout", config);
      
      console.log('slaon came aftere axios ');
  
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
