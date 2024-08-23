import { createSlice } from "@reduxjs/toolkit";

import { UserSignupdata } from "../../../interfaces/user/UserSignupdata";
import { signUpUser,verifyOTP } from "../../actions/user/userActions";

interface UserState {
  user: UserSignupdata | null;
  error: string | null;
  loading: boolean;
  userDetails: UserSignupdata | null;
}

const initialState: UserState = {
  user: null,
  error: null,
  loading: false,
  userDetails: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    updateError: (state, { payload }) => {
      state.error = payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state,) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload as UserSignupdata;
        console.log(payload, "signupuser state inside slice");
      })
      .addCase(signUpUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.error = payload as string; // Assuming payload is an error message
      })

      
      // Verify OTP Cases
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(verifyOTP.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload as UserSignupdata;
        console.log(payload, "verifyotp state inside slice");
      })
      .addCase(verifyOTP.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string; // Assuming payload is an error message
      })
  },
});


export const {updateError}=userSlice.actions
export default userSlice.reducer;