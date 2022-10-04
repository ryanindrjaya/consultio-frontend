import React, { useState } from "react";
import { Send2 } from "iconsax-react";
import Chat from "../../layouts/Chat";
import nookies from "nookies";
import Head from "next/head";
import Sidebar from "../../components/Chat/Sidebar";
import MessageForm from "../../components/Chat/MessageForm";
import axios from "axios";

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const user = cookies.user;

  const rooms = await getRooms(cookies);

  if (cookies.token) {
    return {
      props: {
        userInfo: JSON.parse(user),
        rooms,
        role: cookies.role,
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

async function getRooms(cookies) {
  const token = cookies.token;

  const endpoint = `${process.env.API_URL}/booking`;
  const options = {
    headers: {
      Authorization: token,
    },
  };

  const req = await axios.get(endpoint, options);
  const data = req.data.data.data;

  return data;
}

export default function Chats({ userInfo, rooms, role }) {
  return (
    <>
      <Head>
        <title>Pesan - Consultio</title>
      </Head>
      <div style={{ height: "100vh" }} className="container flex w-full h-6/12 overflow-hidden scrollbar-hide">
        <Sidebar user={userInfo} dataRoom={rooms} role={role} />

        <MessageForm user={userInfo} />
      </div>
    </>
  );
}

Chats.layout = Chat;
