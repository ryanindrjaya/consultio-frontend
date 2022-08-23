import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin, verifyEmail } from "./userAction";
import { cookieCutter } from "cookie-cutter";
import nookies from "nookies";

const userToken =
  cookieCutter?.get("token") === undefined ? null : cookieCutter.get("token");

const initialState = {
  loading: false,
  userInfo: {},
  userToken,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      nookies.destroy(null, "token", {
        path: "/",
      });
      nookies.destroy(null, "role", {
        path: "/",
      });
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.success = false;
    },
  },
  extraReducers: {
    // login user
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.userToken = payload.token;
      state.success = true;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // register user
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // registration successful
      state.userInfo = payload;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // verify user
    [verifyEmail.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [verifyEmail.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
    },
    [verifyEmail.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
