import {configureStore} from "@reduxjs/toolkit";
import authResucer from "./slices/authSlice"
import popupReduser from "./slices/popUpSlice"
import userReducer from "./slices/userSlice"
import bookReducer from "./slices/bookSlice"
import borrowReducer from "./slices/borrowSlice"



export const store = configureStore({
    reducer:{
        auth:authResucer,
        popup:popupReduser,
        user:userReducer,
        book: bookReducer,
        borrow : borrowReducer
    },
    
})