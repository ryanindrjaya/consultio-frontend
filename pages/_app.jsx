import { Toaster } from "react-hot-toast";
import { Router } from "next/router";
import { useState } from "react";

import PageChange from "../components/pageChange/PageChange.js";
import "../styles/globals.css";

import { AppContext, socket } from "../context/appContext";

function MyApp({ Component, pageProps }) {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState({});
  const [joinedRoom, setJoinedRoom] = useState(false);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMessages, setNewMessages] = useState({});
  const [loading, setLoading] = useState(false);

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
