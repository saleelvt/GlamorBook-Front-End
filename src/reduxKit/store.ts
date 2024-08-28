import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/user/userSlice';
import adminSlice from './reducers/admin/adminSlice';
import authSlice from './reducers/auth/authSlice';
export const Store  = configureStore({
  reducer: {
    user: userSlice.reducer  ,
    admin:adminSlice.reducer,
    auth: authSlice.reducer,
  },
});


export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store;
