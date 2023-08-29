import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    fullname: null,
    userName: null,
    email: null,
    expireDate: null,
    refreshToken: null,
    refreshTokenExpiration: null,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      console.log("login",action)
      console.log("login",state)
      state.token = action.payload.token
      state.fullname = action.payload.fullname
      state.userName =  action.payload.userName
      state.email =  action.payload.email
      state.expireDate = action.payload.expireDate
      state.refreshToken =  action.payload.refreshToken
      state.refreshTokenExpiration =  action.payload.refreshTokenExpiration
    },
    logoutAction: (state, action) => {
      return initialState;
    },
    registerAction: (state, action) => {
      return action.payload;
    },
  },
});

// Export actions and reducer
export const { loginAction, logoutAction, registerAction } = AuthSlice.actions;
export default AuthSlice.reducer;
