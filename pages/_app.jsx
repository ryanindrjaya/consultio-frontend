import { Toaster } from "react-hot-toast";
import { Router } from "next/router";
import ReactDOM from "react-dom";
import { useState } from "react";

import PageChange from "../components/pageChange/PageChange.js";
import "../styles/globals.css";

import { AppContext, socket } from "../context/appContext";

Router.events.on("routeChangeStart", () => {
  ReactDOM.render(<PageChange />, document.getElementById("page-transition"));
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
});

function MyApp({ Component, pageProps }) {
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMemberMsg, setPrivateMemberMsg] = useState({});
  const [newMessages, setNewMessages] = useState({});

  const Layout = Component.layout || ((page) => page);

  return (
    <AppContext.Provider
      value={{
        socket,
        members,
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
      <Layout>
        <Component {...pageProps} />
        <Toaster />
      </Layout>
    </AppContext.Provider>
  );
}

export default MyApp;
