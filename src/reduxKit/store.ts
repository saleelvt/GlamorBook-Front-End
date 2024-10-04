/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/user/userSlice';
import adminSlice from './reducers/admin/adminSlice';
import salonSlice from './reducers/salon/salonSlice';
import authSlice from './reducers/auth/authSlice';

export const store  = configureStore({

  reducer: {
    user: userSlice.reducer  ,
    admin:adminSlice.reducer,
    auth: authSlice.reducer,
    salon:salonSlice.reducer
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type ExtendedAppDispatch = (action: any) => any;
export default store;
