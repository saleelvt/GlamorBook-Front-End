import { createSlice } from "@reduxjs/toolkit";
import {
  googleLoginOrSignUp,
  loginUser,
  loginAdmin,
  logout,
  loginSalon,
  adminLogout,
  salonLogout,
  fetchUserStatus
} from "../../actions/auth/authActions";


export interface UserState {
  userData: UserState| null;
  error: string | null;
  loading: boolean;
  role: null;
  status?:string|null;
  isLogged: boolean;
  _id?: string |null
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
    status:localStorage.getItem("status") ? JSON.parse(localStorage.getItem('status')!):null,
    _id:localStorage.getItem("_id") ? JSON.parse(localStorage.getItem('_id')!) :null

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
        console.log( " this is the google auth pay loand ", payload);
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

.addCase(fetchUserStatus.pending,(state)=>{
  state.loading=true,
  state.error= null
})
.addCase(fetchUserStatus.fulfilled,(state,{payload})=>{
  state.loading=false,
  state.error = null;
  state.status=payload
})
.addCase(fetchUserStatus.rejected,(state,{payload})=>{

  state.error=payload as string,
  state.status=null,
  state.loading=false
  })




     
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
        console.log(payload, "login state inside slice any things ");
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
        console.log('my admin paylod role is ',payload.role);
        
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


// logout admin 


.addCase(adminLogout.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(adminLogout.fulfilled, (state) => {
  (state.isLogged = false),
    (state.error = null),
    (state.role = null),
    (state.userData = null);
  localStorage.clear();
})
.addCase(adminLogout.rejected, (state, { payload }) => {
  state.loading = false;
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
        state.isLogged=true
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


      // salonLogout 


      .addCase(salonLogout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(salonLogout.fulfilled, (state) => {
        (state.isLogged = false),
          (state.error = null),
          (state.role = null),
          (state.userData = null);
        localStorage.clear();
      })
      .addCase(salonLogout.rejected, (state, { payload }) => {
        state.loading = false;
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
