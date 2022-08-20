import React from "react";
import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import nookies from "nookies";

import Home from "../../layouts/Home";
import Fitur from "../../components/HomeLayout/Fitur";
import ProfileCard from "../../components/HomeLayout/ProfileCard";
import Feeds from "../../components/HomeLayout/Feeds";

export default function index() {
  const { userInfo, userToken } = useSelector((state) => state.user);

  console.log(userInfo);

  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <div className="">
      {/* feeds */}
      <Feeds />

      {/* profil */}
      <ProfileCard />
    </div>
  );
}

index.layout = Home;
