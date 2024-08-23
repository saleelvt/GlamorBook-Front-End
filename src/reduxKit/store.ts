
import { configureStore } from '@reduxjs/toolkit';

import userState from "../reduxKit/reducers/user/userSlice"
 
 export const  Store=configureStore({

    reducer: {
        user:userState
    }

})

export type RootState=ReturnType<typeof Store.getState>;

export type AppDispatch=typeof Store.dispatch;

export default Store;