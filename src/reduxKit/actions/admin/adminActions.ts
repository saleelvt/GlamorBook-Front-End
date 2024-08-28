import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { URL, config } from "../../../config/constants";
import { IAdminLogin } from "../../../interfaces/admin/IAdminLogin";

export const loginAdmin = createAsyncThunk(
  "admin/loginAdmin",
  async (adminCredentials: IAdminLogin, { rejectWithValue }) => {

    try {
      console.log("admin action got this si smy credential  ", adminCredentials );
      const { data } = await axios.post(
        `${URL}/admin/login`,
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
