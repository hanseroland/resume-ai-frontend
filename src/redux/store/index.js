import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/userSlice";
import resumeReducer from "../slices/resumeSlice";


const store = configureStore({

    reducer:{
        users:usersReducer,
        resumes:resumeReducer
    }

})

export default store;