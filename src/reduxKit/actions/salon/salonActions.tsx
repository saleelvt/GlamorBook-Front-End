import { createAsyncThunk } from "@reduxjs/toolkit";
import { SalonInterface } from "../../../interfaces/salon/salonInterface";
import axios from "axios";
import { URL, config } from "../../../config/constants";

export const signupSalon = createAsyncThunk(
  "salon/signup",
  async (salonOwnerCredentials: SalonInterface, { rejectWithValue }) => {
    try {
      console.log(
        "inside of the action  and my credential salon ",
        salonOwnerCredentials
      );

      const { data } = await axios.post(
        `${URL}/salon/signup`,
        salonOwnerCredentials,
        config
      );
      console.log("after salon axios post ", data.data);
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
