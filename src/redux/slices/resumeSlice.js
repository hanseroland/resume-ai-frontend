import { createSlice } from '@reduxjs/toolkit'


const resumeSlice = createSlice({
    name: 'resumes',
    initialState: {
        currentResume: null,
    },
    reducers: {
        SetCurrentResume(state, action) {
            state.currentResume = action.payload
        },
       
    }
})

export const { 
    SetCurrentResume,
} = resumeSlice.actions;  
export default resumeSlice.reducer;