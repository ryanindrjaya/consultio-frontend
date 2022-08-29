import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin, verifyEmail, verifyUser } from "./userAction";
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

      location.reload();
    },
    reset: (state) => {
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

    // verify email
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

    // verify user
    [verifyUser.pending]: (state) => {
      state.success = false;
      state.loading = true;
      state.error = null;
    },
    [verifyUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.success = true;
    },
    [verifyUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { logout, reset } = userSlice.actions;
export default userSlice.reducer;
