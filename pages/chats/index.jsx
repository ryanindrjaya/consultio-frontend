import React, { useState } from "react";
import { Send2 } from "iconsax-react";
import Home from "../../layouts/Home";
import Head from "next/head";
import Sidebar from "../../components/Chat/Sidebar";
import MessageForm from "../../components/Chat/MessageForm";

export default function Chats() {
  return (
    <>
      <Head>
        <title>Pesan - Consultio</title>
      </Head>
      <div
        style={{ height: "92vh" }}
        className="container flex w-full h-6/12 overflow-hidden scrollbar-hide"
      >
        <Sidebar />

        <MessageForm />
      </div>
    </>
  );
}

Chats.layout = Home;
