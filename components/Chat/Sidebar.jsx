import React, { useContext, useEffect } from "react";
import nookies from "nookies";
import axios from "axios";
import { AppContext } from "../../context/appContext";
import moment from "moment";
import "moment/locale/id";
import Link from "next/link";
import { useState } from "react";
import { ArchiveTick, ArrangeHorizontal, ArrowLeft3, ArrowRight3, CloseCircle, MessageProgramming } from "iconsax-react";

import { motion } from "framer-motion";

function filterByValue(array, string) {
  return array.filter((o) => Object.keys(o).some((k) => o[k].toLowerCase().includes(string.toLowerCase())));
}

function sortDate(array) {
  return array.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
}

function Sidebar({ user, dataRoom, role }) {
  moment.locale("id");
  const cookies = nookies.get(null);

  const { socket, setCurrentRoom, setRooms, setJoinedRoom, currentRoom, messages, sidebarChat, setSidebarChat } = useContext(AppContext);

  const [joinedRoom, setjoinedRoom] = useState(false);
  const [status, setStatus] = useState(true);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [newMessage, setNewMessage] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setRooms(dataRoom);

    if (cookies.currentRoom) {
      setCurrentRoom(JSON.parse(cookies.currentRoom));
      setJoinedRoom(true);
    } else {
      setCurrentRoom({});
    }

    socket.emit("join-room", { userId: user.userId });
    setLoading(false);
  }, []);

  useEffect(() => {
    const consultantId = dataRoom[0]?.consultantId;
    if (role !== "USER") {
      socket.emit("chat-history", {
        userId: user.userId,
        consultantId: consultantId,
        status: status,
      });
    } else {
      socket.emit("chat-history", { userId: user.userId, status: status });
    }
  }, [messages, status]);

  useEffect(() => {
    if (selectedChatId) {
      socket.emit("chat-detail", {
        userId: user.userId,
        chatId: selectedChatId,
      });
    }
  }, [selectedChatId]);

  /**
   * event error-log
   * listen error from server
   */

  socket.off("message-history").on("message-history", (data) => {
    setNewMessage(sortDate(data));
  });

  socket.on("join-room-response", (data) => {
    if (data?.message === "success") {
      setjoinedRoom(true);
    }
  });

  const joinRoom = (room) => {
    setSelectedChatId(room.chatId);
    setCurrentRoom(room);
    setJoinedRoom(true);
    nookies.set(null, "currentRoom", JSON.stringify(room), {
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });
    socket.emit("join-room", { userId: user.userId, chatId: room.chatId });
  };

  const activeRoom = "profile-chat flex ml-4 mt-2 duration-100 bg-primary rounded-lg p-4 text-white mr-4 cursor-pointer";
  const normalRoom = "profile-chat duration-100 flex ml-4 mt-2 p-4 mr-4 cursor-pointer";

  const spring = {
    type: "spring",
    stiffness: 300,
    damping: 40,
  };

  return (
    <motion.div
      layout
      transition={spring}
      className={`sideleft absolute lg:static h-screen ${sidebarChat ? "left-0" : "-left-96"} w-3/4 lg:w-2/5 border-r scrollbar-hide bg-white z-50`}
    >
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <svg
            aria-hidden="true"
            className="animate-spin text-white mx-auto w-32 h-32 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      ) : (
        <div className="profile-list mt-3 pb-24 h-screen overflow-y-scroll scrollbar-hide">
          {sidebarChat && (
            <div className="lg:hidden flex w-full justify-end px-4 cursor-pointer">
              <CloseCircle size={32} onClick={() => setSidebarChat(false)} className="text-primary" />
            </div>
          )}
          <div className="lg:w-2/5 w-3/4 ml-4 p-4 flex">
            {status ? <ArrangeHorizontal size="24" color="#487EEB" /> : <ArchiveTick size="24" color="#487EEB" />}

            <select onChange={() => setStatus(!status)} className="w-full outline-none ml-2">
              <option className="font-poppins" selected={status} value={status}>
                Ongoing Booking
              </option>
              <option className="font-poppins" selected={!status} value={!status}>
                Completed Booking
              </option>
            </select>
          </div>
          {newMessage?.length > 0 ? (
            newMessage.map((msg, idx) => (
              <div key={idx} onClick={() => joinRoom(msg)} className={currentRoom.chatId === msg.chatId ? activeRoom : normalRoom}>
                <img
                  src={`http://203.6.149.156:8480/public/${msg.sender === user.userId ? msg.receiverPhoto : msg.senderPhoto}`}
                  className="rounded-full object-cover object-center border w-16 h-16 mr-5"
                />
                <div className="flex w-3/4  flex-col justify-between">
                  <div className="flex w-full justify-between">
                    <h5 style={{ fontSize: "16px", fontWeight: "bold" }}>{msg.sender === user.userId ? msg.receiverName : msg.senderName}</h5>
                    <p style={{ fontWeight: "medium", fontSize: "14px" }}>{moment(msg.createdAt).format("LT")}</p>
                  </div>

                  <p className="w-full truncate" style={{ fontSize: "14px" }}>
                    {msg.message}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex flex-col justify-center items-center">
              <h1 className="font-poppins text-2xl font-bold text-gray-600">
                {status ? "You don't have any ongoing booking" : "You don't have any completed booking"}
              </h1>
              {role === "USER" && (
                <>
                  <Link href={"/consultant/mental-health"}>
                    <button className="bg-primary/90 duration-100 hover:bg-primary py-4 px-7 w-2/4 rounded-lg mt-3 text-white">
                      Konsultasi Kesehatan Mental
                    </button>
                  </Link>
                  <Link href={"consultant/lawyer"}>
                    <button className="bg-primary/90 duration-100 hover:bg-primary py-4 px-7 w-2/4 rounded-lg mt-3 text-white">
                      Konsultasi Hukum
                    </button>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}

export default Sidebar;
