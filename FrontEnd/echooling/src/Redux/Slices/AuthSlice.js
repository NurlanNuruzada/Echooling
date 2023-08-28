import { createSlice } from "@reduxjs/toolkit";
const initialState = { token: null, name: null, surname: null, email: null }
export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginAction: (state, action) => {
            return action.payload;
        },
        logoutAction: (state, action) => {
            return initialState;
        },
        registerAction: (state, action) => {
            return action.payload;
        },
    },
});


export default AuthSlice.reducer;
export const { loginAction, logoutAction,registerAction } = AuthSlice.actions;
