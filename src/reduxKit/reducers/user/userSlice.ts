import { createSlice } from "@reduxjs/toolkit";

import { UserSignupdata } from "../../../interfaces/user/UserSignupdata";
import {
  signUpUser,
  verifyOTP,
  googleLoginOrSignUp,
  loginUser,
} from "../../actions/user/userActions";
import { logout } from "../../actions/user/userActions";
import { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  user: UserSignupdata | null;
  error: string | null;
  loading: boolean;
  userDetails: UserSignupdata | null;
  role: null;
  isLogged: boolean;
}

const initialState: UserState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
  error: null,
  loading: false,
  userDetails: null,
  role: localStorage.getItem("role")
    ? JSON.parse(localStorage.getItem("role")!)
    : null,
  isLogged: localStorage.getItem("isLogged")
    ? JSON.parse(localStorage.getItem("isLogged")!)
    : false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateError: (state, { payload }) => {
      state.error = payload;
    },
    setUserDetails: (state, { payload }: PayloadAction<UserSignupdata>) => {
      console.log("this is my payload ", payload);
      state.userDetails = payload;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // logout: (state, {payload}) => {
    //   state.user = null
    //   state.isLogged = false
    //   state.role = null
    //   state.userDetails = null
    //   state.error = null
    //   state.loading = false
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload as UserSignupdata;
        state.role = payload.role;
        console.log(payload, "signupuser state inside slice");
        state.isLogged = true;
      })
      .addCase(signUpUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.role = null;
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
        state.role = payload.role;
        state.isLogged = true;
        console.log(payload, "verifyotp state inside slice");
      })
      .addCase(verifyOTP.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string; // Assuming payload is an error message
      })

      // Google Login/Sign Up Cases
      .addCase(googleLoginOrSignUp.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(googleLoginOrSignUp.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload;
        state.role = payload.role;
      })
      .addCase(googleLoginOrSignUp.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.role = null;
        state.error = payload as string; // Assuming payload is an error message
      })
      // Login Cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.user = payload;
        state.role = payload.role;
        state.isLogged = true;
        localStorage.setItem("role", JSON.stringify(state.role));
        localStorage.setItem("isLogged", JSON.stringify(state.isLogged));
        localStorage.setItem("user", JSON.stringify(state.user));
        console.log(payload, "login state inside slice");
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.user = null;
        state.role = null;
        state.error = payload as string; // Assuming payload is an error message
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        (state.isLogged = false),
          (state.error = null),
          (state.role = null),
          (state.user = null);
          localStorage.clear()
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string; // Assuming payload is an error message
      });
  },
});

export const { updateError, setUserDetails } = userSlice.actions;
export default userSlice;
