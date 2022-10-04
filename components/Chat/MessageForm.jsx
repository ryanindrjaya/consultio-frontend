import { Send2 } from "iconsax-react";
import React, { useContext, useState } from "react";
import { AppContext } from "../../context/appContext";
import nookies from "nookies";
import { useEffect } from "react";
import { useRef } from "react";

function MessageForm({ user }) {
  const [message, setMessage] = useState("");
  const [chatDetail, setChatDetail] = useState([]);
  const messageEndRef = useRef(null);

  const { socket, currentRoom, setMessages, messages, privateMemberMsg, setPrivateMemberMsg } = useContext(AppContext);

  useEffect(() => {
    setPrivateMemberMsg(privateMemberMsg);
    socket.emit("chat-detail", { userId: user.userId, chatId: currentRoom.chatId });
  }, [chatDetail]);

  socket.on("message-log", (data) => {
    console.log("message log", data);
    setChatDetail((prev) => [...prev, data]);
  });

  socket.on("message-detail", (data) => {
    setChatDetail(data);
  });

  async function sendMessage(e) {
    e.preventDefault();
    const chatId = currentRoom.chatId;
    const userId = user.userId;
    const consultantId = currentRoom.consultantId;

    socket.emit("send-message", {
      chatId,
      sender: userId,
      receiver: consultantId,
      message,
    });
    setMessage("");
  }

  function scrollToBottom() {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="sideright flex flex-col justify-between h-full overflow-y-hidden w-3/5 scrollbar-hide border-r">
      <div className="w-full ">
        <div
          className="w-full flex items-center"
          style={{
            backgroundColor: "#437EEB",
            height: "20%",
            minHeight: "104px",
          }}
        >
          <div className="flex items-center">
            <img
              src={`http://203.6.149.156:8480/public/${currentRoom.consultantPhoto}`}
              className="rounded-full h-16 w-16 object-cover object-center mx-6 border"
            />

            <h5 className="text-lg font-medium text-white font-inter">{currentRoom?.consultantName}</h5>
          </div>
        </div>
      </div>

      <div className="w-full flex-1 relative chat-list overflow-y-scroll scrollbar-hide">
        {chatDetail.length > 0 && (
          <>
            {chatDetail.map((msg, idx) => (
              <div key={idx} className="chat my-2" style={{ minHeight: "64px" }}>
                <div
                  className={`absolute ${user.userId === msg.sender ? "right-0 text-white" : "left-0 text-gray-800"} m-3 p-5`}
                  style={{
                    backgroundColor: user.userId !== msg.sender ? "rgba(0, 0, 0, 0.1)" : "#437EEB",
                    borderRadius: user.userId !== msg.sender ? "0 15px 15px 15px" : "15px 0 15px 15px",
                  }}
                >
                  {msg.message}
                </div>
              </div>
            ))}
            <div ref={messageEndRef}></div>
          </>
        )}
      </div>

      <form onSubmit={sendMessage} className="w-full relative mb-5 mt-3 h-14 px-4">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-full pl-8 pr-20 relative rounded-full outline-none focus:outline-primary duration-300"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          }}
        />

        <button type="submit" className="bg-primary cursor-pointer rounded-full absolute top-1 right-6 p-3">
          <Send2 size={24} variant="Bold" color="white" />
        </button>
      </form>
    </div>
  );
}

export default MessageForm;
