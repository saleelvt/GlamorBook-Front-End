import { createSlice } from "@reduxjs/toolkit";

import { loginAdmin } from "../../actions/admin/adminActions";
import { AdminInterface } from "../../../interfaces/admin/AdminInterface";
 
 export interface AdminState {
    
    admin:AdminInterface|null;
    error: string | null;
    loading: boolean;
    adminDetails:AdminInterface|null
  }
  
  const initialState: AdminState = {
    admin: null,
    error: null,
    loading: false,
    adminDetails:null
  };
  
  const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
      updateError: (state, { payload }) => {
        state.error = payload;
      },
    },

    extraReducers:(builder)=>{
        // admin login casess
        

        builder
       .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(loginAdmin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.admin = payload;
      })
      .addCase(loginAdmin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string; // Assuming payload is an error message
      })

    }

})

export const { updateError } = adminSlice.actions;
export default adminSlice