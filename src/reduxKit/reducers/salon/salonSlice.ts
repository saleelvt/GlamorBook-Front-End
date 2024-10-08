import { createSlice } from "@reduxjs/toolkit";
import { signupSalon } from "../../actions/salon/salonActions";
import { verifyOTP } from "../../actions/user/userActions";
import { SalonInterface } from "../../../interfaces/salon/salonInterface";

interface SalonState {
  salonOwner: SalonInterface | null;
  error: string | null;
  loading: boolean;
}

const initialState: SalonState = {
  salonOwner: null,
  error: null,
  loading: false,
};

const SalonState = createSlice({
  name: "salonSlice",
  initialState,
  reducers: {
    updateError: (state, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //Salon SignUp
      .addCase(signupSalon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupSalon.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.salonOwner = payload as SalonInterface;
        console.log("my payload is ", payload);
      })
      .addCase(signupSalon.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
        state.salonOwner = null;
      })

      // Verfy Otp
      .addCase(verifyOTP.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(verifyOTP.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.salonOwner = payload as SalonInterface; // Update user state as needed
        console.log(payload, "verifyotp state inside  theater slice");
      })
      .addCase(verifyOTP.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string; // Assuming payload is an error message
      });
      

  },
});

export const { updateError } = SalonState.actions;
export default SalonState;
