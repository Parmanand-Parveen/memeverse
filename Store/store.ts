import { configureStore } from "@reduxjs/toolkit";
import MemeSlice from "./slices/MemeSlice"


const store = configureStore({
    reducer:{
       memes:MemeSlice
    }
})





export default store