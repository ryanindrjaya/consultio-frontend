import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import nookies from "nookies";

export const registerUser = createAsyncThunk(
  "user/register",
  async ({ fullname, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const endpoint = process.env.API_URL + "/register/user";

      await axios.post(endpoint, { fullname, email, password }, config);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const endpoint = process.env.API_URL + "/login";

      const req = await axios.post(endpoint, { email, password }, config);

      const user = req.data.data;

      if (user.token) {
        // set new token
        nookies.set(null, "token", user.token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
        });

        const role = user.profile.role;

        // set role token
        nookies.set(null, "role", role, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
        });
      }

      return user;
    } catch (error) {
      return rejectWithValue("Email atau password kamu salah!");
    }
  }
);
