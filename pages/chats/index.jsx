import React, { useContext, useState } from "react";
import { Send2 } from "iconsax-react";
import Chat from "../../layouts/Chat";
import nookies from "nookies";
import Head from "next/head";
import Sidebar from "../../components/Chat/Sidebar";
import MessageForm from "../../components/Chat/MessageForm";
import axios from "axios";
import Modal from "../../components/Modal/endChatForm";
import { AppContext } from "../../context/appContext";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

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
  const { currentRoom } = useContext(AppContext);
  const router = useRouter();

  const [showModalEndChat, setShowModalEndChat] = useState(false);
  const [solution, setSolution] = useState("");

  const handleCloseModalEndChat = () => {
    setShowModalEndChat(false);
  };

  const handleShowModalEndChat = () => {
    setShowModalEndChat(true);
  };

  const handleSubmitEndChat = async (e) => {
    const cookies = nookies.get(null);
    const { token } = cookies;

    const bookingId = currentRoom?.bookingId;

    const endpoint = `${process.env.API_URL}/booking/${bookingId}`;
    const options = {
      headers: {
        Authorization: token,
      },
    };
    const data = {
      solution,
    };

    try {
      const req = await axios.put(endpoint, data, options);
      const res = req.data;

      if (res.status == 200) {
        router.push("/chats");
      }
      handleCloseModalEndChat();

      nookies.destroy(null, "currentRoom");

      router.reload();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleOnChangeSolution = (e) => {
    setSolution(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Pesan - Consultio</title>
      </Head>
      <div style={{ height: "100vh" }} className="container flex w-full h-6/12 overflow-hidden scrollbar-hide">
        {showModalEndChat && (
          <Modal closeModal={() => handleCloseModalEndChat()} onChange={(e) => handleOnChangeSolution(e)} onSubmit={(e) => handleSubmitEndChat(e)} />
        )}

        <Sidebar user={userInfo} dataRoom={rooms} role={role} />
        <MessageForm
          user={userInfo}
          showModal={() => {
            handleShowModalEndChat();
          }}
        />
      </div>
    </>
  );
}

Chats.layout = Chat;
