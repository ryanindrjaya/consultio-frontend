import React, { useState } from "react";
import { Send2 } from "iconsax-react";
import Home from "../../layouts/Home";
import nookies from "nookies";
import Head from "next/head";
import Sidebar from "../../components/Chat/Sidebar";
import MessageForm from "../../components/Chat/MessageForm";

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const user = cookies.user;

  if (cookies.token) {
    return {
      props: {
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

export default function Chats({ userInfo }) {
  return (
    <>
      <Head>
        <title>Pesan - Consultio</title>
      </Head>
      <div style={{ height: "92vh" }} className="container flex w-full h-6/12 overflow-hidden scrollbar-hide">
        <Sidebar user={userInfo} />

        <MessageForm user={userInfo} />
      </div>
    </>
  );
}

Chats.layout = Home;
