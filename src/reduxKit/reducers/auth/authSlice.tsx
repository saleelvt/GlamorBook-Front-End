import { createSlice } from "@reduxjs/toolkit";
import {
  googleLoginOrSignUp,
  loginUser,
  loginAdmin,
  logout,
  loginSalon,
} from "../../actions/auth/authActions";

export interface UserState {
  userData: null;
  error: string | null;
  loading: boolean;
  role: null;
  isLogged: boolean;
}

const initialState: UserState = {
  userData: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
  error: null,
  loading: false,
  role: localStorage.getItem("role")
    ? JSON.parse(localStorage.getItem("role")!)
    : null,
  isLogged: localStorage.getItem("isLogged")
    ? JSON.parse(localStorage.getItem("isLogged")!)
    : false,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateError: (state, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder


















      // Google Login/Sign Up Cases
      .addCase(googleLoginOrSignUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLoginOrSignUp.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.loading = false;
        state.error = null;
        state.userData = payload;
        state.role = payload.role;
        state.isLogged = true;
        localStorage.setItem("role", JSON.stringify(state.role));
        localStorage.setItem("isLogged", JSON.stringify(state.isLogged));
        localStorage.setItem("user", JSON.stringify(state.userData));
      })
      .addCase(googleLoginOrSignUp.rejected, (state, { payload }) => {
        state.loading = false;
        state.userData = null;
        state.role = null;
        state.error = payload as string;
      })






















      // Login Cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.userData = payload;
        state.role = payload.role;
        state.isLogged = true;
        localStorage.setItem("role", JSON.stringify(state.role));
        localStorage.setItem("isLogged", JSON.stringify(state.isLogged));
        localStorage.setItem("user", JSON.stringify(state.userData));
        console.log(payload, "login state inside slice");
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.userData = null;
        state.role = null;
        state.error = payload as string;
      })


























      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.userData = payload;
        state.role = payload.role;
        state.isLogged = true;
        localStorage.setItem("role", JSON.stringify(state.role));
        localStorage.setItem("isLogged", JSON.stringify(state.isLogged));
        localStorage.setItem("user", JSON.stringify(state.userData));
        console.log(payload, "login state inside slice");
      })
      .addCase(loginAdmin.rejected, (state, { payload }) => {
        state.loading = false;
        state.userData = null;
        state.role = null;
        state.error = payload as string;
      })



















      // login salon

      .addCase(loginSalon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginSalon.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.userData = payload;
        state.role = payload.role;
        localStorage.setItem("role", JSON.stringify(state.role));
        localStorage.setItem("isLogged", JSON.stringify(state.isLogged));
        localStorage.setItem("user", JSON.stringify(state.userData));
        console.log(payload, "salonlogin macha sssaanam kitt  state inside slice");
      })
      .addCase(loginSalon.rejected, (state, { payload }) => {
        state.loading = false;
        state.userData = null;
        state.role = null;
        state.error = payload as string;
      })























      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        (state.isLogged = false),
          (state.error = null),
          (state.role = null),
          (state.userData = null);
        localStorage.clear();
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      });
  },
});

export const { updateError } = authSlice.actions;
export default authSlice;