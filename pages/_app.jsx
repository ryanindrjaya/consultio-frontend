import { Toaster } from "react-hot-toast";
import { Router } from "next/router";
import { useState } from "react";
import dynamic from "next/dynamic";

import "../styles/globals.css";
const PageChange = dynamic(
  () => import("../components/pageChange/PageChange.js"),
  { ssr: false }
);

import { AppContext, socket } from "../context/appContext";

function MyApp({ Component, pageProps }) {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState({});
  const [joinedRoom, setJoinedRoom] = useState(false);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMessages, setNewMessages] = useState({});
  const [sidebarChat, setSidebarChat] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusChat, setStatusChat] = useState(true);

  const Layout = Component.layout || ((page) => page);

  Router.events.on("routeChangeStart", () => {
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", () => {
    setLoading(false);
  });
  Router.events.on("routeChangeError", () => {
    setLoading(false);
  });

  return (
    <AppContext.Provider
      value={{
        socket,
        members,
        joinedRoom,
        setJoinedRoom,
        setMembers,
        messages,
        setMessages,
        privateMemberMsg,
        setPrivateMemberMsg,
        newMessages,
        setNewMessages,
        rooms,
        setRooms,
        currentRoom,
        setCurrentRoom,
        sidebarChat,
        setSidebarChat,
        statusChat,
        setStatusChat
      }}
    >
      {loading ? (
        <>
          <PageChange />
          <Toaster />
        </>
      ) : (
        <Layout>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
      )}
    </AppContext.Provider>
  );
}

export default MyApp;
