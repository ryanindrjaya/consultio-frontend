import React from "react";
import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import nookies from "nookies";

import { logout } from "../../features/user/userSlice";
import Home from "../../layouts/Home";

export default function index() {
  const { userInfo, userToken } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const router = useRouter();

  console.log("user : ", userInfo);

  return (
    <div>
      {userInfo ? (
        <button
          type="button"
          onClick={(e) => {
            dispatch(logout());
            window.location.reload(false);
          }}
        >
          logout
        </button>
      ) : (
        <button type="button" onClick={() => router.replace("/auth/login")}>
          login
        </button>
      )}
    </div>
  );
}

index.layout = Home;
