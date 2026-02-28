import {configureStore} from "@reduxjs/toolkit";
import authResucer from "./slices/authSlice"
import popupReduser from "./slices/popUpSlice"
import userReducer from "./slices/userSlice"
import videoReducer from "./slices/videoSlice"; 
import playerReducer from "./slices/playerSlice";
import paymentReducer from "./slices/paymentSlice";
import seasonImagesReducer from "./slices/seasonImagesSlice";


export const store = configureStore({
    reducer:{
        auth:authResucer,
        popup:popupReduser,
        user:userReducer,
        videos: videoReducer,
        players: playerReducer,
        payment: paymentReducer,
        seasonImages: seasonImagesReducer,
    },
    
})