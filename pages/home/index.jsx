import React, { useState } from "react";
import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import nookies from "nookies";

import Home from "../../layouts/Home";
import Fitur from "../../components/HomeLayout/Fitur";
import Thread from "../../components/HomeLayout/Thread";
import Feeds from "../../components/HomeLayout/Feeds";

import { Toaster } from "react-hot-toast";
import axios from "axios";

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);

  const res = await fetchData(cookies);
  const posts = await res.json();

  if (res.status == 200) {
    return {
      props: {
        data: posts.data.data,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/auth/login",
      },
    };
  }
}

const fetchData = async (cookies) => {
  console.log(cookies);
  try {
    const endpoint = process.env.API_URL + "/posts";

    const config = {
      method: "GET",
      headers: {
        Authorization: cookies.token,
      },
    };

    const req = await fetch(endpoint, config);

    return req;
  } catch (error) {
    console.log(error);
  }
};

export default function index({ data }) {
  const { userInfo, userToken } = useSelector((state) => state.user);
  const [posts, setPosts] = useState(data);

  console.log(userInfo);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLike = async (postId) => {
    const endpoint = process.env.API_URL + "/like/" + postId;
    const cookies = nookies.get(null, "token");

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo.token,
      },
    };
    const res = await fetch(endpoint, config);
    console.log(res);

    if (res) {
      const req = await fetchData(cookies);
      const posts = await req.json();
      setPosts(posts.data.data);
    }
  };

  const handleUnlike = async (postId) => {
    const endpoint = process.env.API_URL + "/like/" + postId;
    const cookies = nookies.get(null, "token");

    const config = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo.token,
      },
    };
    const res = await fetch(endpoint, config);
    console.log(res);

    if (res) {
      const req = await fetchData(cookies);
      const posts = await req.json();
      setPosts(posts.data.data);
    }
  };

  return (
    <div className="flex justify-center  w-full scrollbar-hide">
      {/* feeds */}
      <Feeds data={posts} onLike={handleLike} onUnlike={handleUnlike} />

      <Toaster />
    </div>
  );
}

index.layout = Home;
