import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/user/userSlice';
import adminSlice from './reducers/admin/adminSlice';
export const Store  = configureStore({
  reducer: {
    user: userSlice.reducer  ,
    admin:adminSlice.reducer,
  
  },
});



// export type RootState = {
//     user: UserState;
//   };

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store;
