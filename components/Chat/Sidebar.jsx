import React, { useContext, useEffect } from "react";
import nookies from "nookies";
import axios from "axios";
import { AppContext } from "../../context/appContext";
import moment from "moment";
import "moment/locale/id";
import Link from "next/link";

function Sidebar() {
  moment.locale("id");
  const { socket, setMembers, members, setCurrentRoom, setRooms, privateMemberMsg, rooms, setPrivateMemberMsg, currentRoom, messages } =
    useContext(AppContext);

  useEffect(() => {
    setCurrentRoom(currentRoom);
    getRooms();
  }, []);

  function joinRoom(room) {
    console.log(room);
    const chatId = room.chatId;
    socket.emit("join-room", { id: chatId });
    setCurrentRoom(room.chatId);
  }

  socket.on("join-room", (msg) => {
    console.log(msg);
  });

  function handlePrivateMemberMsg(room) {
    setPrivateMemberMsg(room);
    joinRoom(room);
  }

  async function getRooms() {
    const cookies = nookies.get(null);
    const token = cookies.token;

    const endpoint = `${process.env.API_URL}/booking`;
    const options = {
      headers: {
        Authorization: token,
      },
    };

    const req = await axios.get(endpoint, options);
    const data = req.data.data.data;

    setRooms(data);
  }

  const activeRoom = "profile-chat flex ml-4 mt-2 duration-100 bg-primary rounded-lg p-4 text-white mr-4 cursor-pointer";
  const normalRoom = "profile-chat duration-100 flex ml-4 mt-2 p-4 mr-4 cursor-pointer";

  return (
    <div className="sideleft h-screen w-2/5 border-r scrollbar-hide">
      <div className="profile-list mt-3 pb-24 h-screen overflow-y-scroll scrollbar-hide">
        {rooms.length > 0 ? (
          rooms?.map((room, idx) => (
            <>
              {room.status === "Active" && (
                <div key={idx} onClick={() => handlePrivateMemberMsg(room)} className={currentRoom === room.chatId ? activeRoom : normalRoom}>
                  <img
                    src={`http://203.6.149.156:8480/public/${room.consultantPhoto}`}
                    className="rounded-full object-cover object-center border w-16 h-16 mr-5"
                  />
                  <div className="flex w-full justify-between">
                    <div className="flex flex-col justify-between">
                      <h5 style={{ fontSize: "16px", fontWeight: "bold" }}>{room.consultantName}</h5>
                      <p>Hello World</p>
                    </div>
                    <div className="flex flex-col w-10 justify-between items-center mr-10">
                      <p style={{ fontWeight: "medium", fontSize: "14px" }}>{moment(room.updatedAt).format("LT")}</p>

                      <div
                        className="w-6 h-6 rounded-full text-center flex justify-center items-center"
                        style={{
                          backgroundColor: "red",
                          color: "white",
                          fontSize: "14px",
                        }}
                      >
                        5
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ))
        ) : (
          <div className="h-full flex flex-col justify-center items-center">
            <h1 className="font-poppins text-2xl font-bold text-gray-600">Anda belum melakukan konsultasi</h1>
            <Link href={"/consultant/mental-health"}>
              <button className="bg-primary/90 duration-100 hover:bg-primary py-4 px-7 w-2/4 rounded-lg mt-3 text-white">
                Konsultasi Kesehatan Mental
              </button>
            </Link>
            <Link href={"consultant/lawyer"}>
              <button className="bg-primary/90 duration-100 hover:bg-primary py-4 px-7 w-2/4 rounded-lg mt-3 text-white">Konsultasi Hukum</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
