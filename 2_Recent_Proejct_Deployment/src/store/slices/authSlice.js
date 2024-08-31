// authSlice는 사용하고 있지 않음.
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {account: null},
    reducers: {
        setAuth: (state, action) => {
            state.account = action.payload;
        }
    }
})

export default authSlice;