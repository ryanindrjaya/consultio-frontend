import React from "react";
import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import nookies from "nookies";

import Home from "../../layouts/Home";
import Fitur from "../../components/HomeLayout/Fitur";
import Thread from "../../components/HomeLayout/Thread";
import Feeds from "../../components/HomeLayout/Feeds";

import { Toaster } from "react-hot-toast";

export default function index() {
  const { userInfo, userToken } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className="flex w-full scrollbar-hide">
      {/* feeds */}
      <Feeds />

      <Toaster />

      {/* profil */}
      <Thread />
    </div>
  );
}

index.layout = Home;
