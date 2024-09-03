import { createSlice } from "@reduxjs/toolkit";
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

    extraReducers:()=>{
        // admin login casess
    

    }

})

export const { updateError } = adminSlice.actions;
export default adminSlice