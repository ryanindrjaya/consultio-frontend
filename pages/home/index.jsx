import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../features/user/userSlice";

function index() {
  const { userInfo, userToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div>
      {userToken ? (
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

export default index;
