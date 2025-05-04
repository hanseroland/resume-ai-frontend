import { createSlice } from '@reduxjs/toolkit'


const usersSlice = createSlice({
    name: 'users',
    initialState: {
        currentUser: null,
        userUpdated:null
    },
    reducers: {
        SetCurrentUser(state, action) {
            state.currentUser = action.payload
        },
        UpdateUserProfil(state, action) {
            state.userUpdated = action.payload
        },
    }
})

export const { 
    SetCurrentUser,
    UpdateUserProfil
} = usersSlice.actions;  
export default usersSlice.reducer;