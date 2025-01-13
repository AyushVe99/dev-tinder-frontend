import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "User",
    initialState: null,
    reducers: {
        addUser: (state, action) => {
            return action.payload;
        },
        removeUser: (state, action) => {
            return null;
        },
        editUser: (state, action) => {
            return { ...state, ...action.payload };
        }
        
    },
})

export const { addUser, removeUser, editUser} = userSlice.actions;
export default userSlice.reducer;