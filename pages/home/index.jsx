import React, { useRef, useState } from "react";
import nookies from "nookies";

import Home from "../../layouts/Home";
import Fitur from "../../components/HomeLayout/Fitur";
import Thread from "../../components/HomeLayout/Thread";
import Feeds from "../../components/HomeLayout/Feeds";

import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Head from "next/head";

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const user = cookies.user;

  const res = await fetchData(cookies);
  const posts = await res.json();

  if (cookies.token) {
    return {
      props: {
        data: posts,
        userInfo: JSON.parse(user),
      },
    };
  } else {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
}

const fetchData = async (cookies) => {
  try {
    const endpoint = process.env.API_URL + "/posts?limit=10&page=1";

    const config = {
      method: "GET",
      headers: {
        Authorization: cookies.token,
      },
    };

    const req = await fetch(endpoint, config);

    return req;
  } catch (error) {
    toast("Terjadi kesalahan saat mengambil data");
  }
};

export default function Index({ data, userInfo }) {
  const [posts, setPosts] = useState(data.data.data ? data.data.data : []);

  const handleLike = async (postId) => {
    const endpoint = process.env.API_URL + "/like/" + postId;
    const cookies = nookies.get(null, "token");

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies.token,
      },
    };
    const res = await fetch(endpoint, config);

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
        Authorization: cookies.token,
      },
    };
    const res = await fetch(endpoint, config);

    if (res) {
      const req = await fetchData(cookies);
      const posts = await req.json();
      setPosts(posts.data.data);
    }
  };

  const handlePost = async (data) => {
    const cookies = nookies.get(null, "token");

    try {
      const config = {
        headers: {
          Authorization: cookies.token,
        },
      };

      const endpoint = process.env.API_URL + "/posts";

      const res = await axios.post(endpoint, data, config);

      if (res.status == 201) {
        toast.success("Cerita anda berhasil di upload");
        const newData = await fetchData(cookies);
        const posts = await newData.json();

        setPosts(posts.data.data);
      } else {
        toast.error("Gagal mengupload cerita");
      }
    } catch (error) {
      toast("Terjadi kesalahan saat mengambil data");
    }
  };

  return (
    <>
      <Head>
        <title>Home - Consultio</title>
      </Head>
      <div className="flex lg:justify-center overflow-y-scroll max-h-screen w-full scrollbar-hide pb-16">
        {/* feeds */}
        <Feeds data={posts} userInfo={userInfo} onLike={handleLike} onUnlike={handleUnlike} handleSubmit={handlePost} />

        <Toaster />
      </div>
    </>
  );
}

Index.layout = Home;
