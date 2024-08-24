import { configureStore } from '@reduxjs/toolkit';
import userSlice, { UserState } from './reducers/user/userSlice';
export const Store  = configureStore({
  reducer: {
    user: userSlice.reducer  ,
  },
});
export type RootState = {
    user: UserState;
  };

// export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store;
