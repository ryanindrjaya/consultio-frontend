import { Send2 } from "iconsax-react";
import React, { useContext, useState } from "react";
import { AppContext } from "../../context/appContext";
import nookies from "nookies";
import { useEffect } from "react";

function MessageForm() {
  const [message, setMessage] = useState("");

  const {
    socket,
    currentRoom,
    setMessages,
    messages,
    privateMemberMsg,
    setPrivateMemberMsg,
  } = useContext(AppContext);

  useEffect(() => {
    setPrivateMemberMsg(privateMemberMsg);
    socket.emit("chat-history", { currentRoom });
  }, [currentRoom]);

  socket.on("send-message-response", (data) => {
    setMessages([...messages, data]);
  });

  socket.on("send-message-response", (msg) => {
    setMessages(msg);
    console.log(msg);
  });

  console.log(messages);

  async function sendMessage(e) {
    e.preventDefault();
    const chatId = currentRoom;
    const userId = privateMemberMsg.consultantUserId;
    const consultantId = privateMemberMsg.consultantId;

    socket.emit("send-message", {
      chatId,
      sender: userId,
      receiver: consultantId,
      message,
    });

    setMessage("");
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
              src={`http://203.6.149.156:8480/public/${privateMemberMsg.consultantPhoto}`}
              className="rounded-full h-16 w-16 object-cover object-center mx-6 border"
            />

            <h5 className="text-lg font-medium text-white font-inter">
              {privateMemberMsg?.consultantName}
            </h5>
          </div>
        </div>
      </div>

      <div className="w-full flex-1 relative chat-list overflow-y-scroll scrollbar-hide">
        <div className="chat" style={{ minHeight: "64px" }}>
          <div
            className="absolute left-0 m-3 p-5"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              borderRadius: "0 15px 15px 15px",
            }}
          >
            Test
          </div>
        </div>
      </div>

      <form
        onSubmit={sendMessage}
        className="w-full relative mb-5 mt-1 h-14 px-4"
      >
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-full pl-8 pr-20 relative rounded-full outline-none focus:outline-primary duration-300"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          }}
        />

        <button
          type="submit"
          className="bg-primary cursor-pointer rounded-full absolute top-1 right-6 p-3"
        >
          <Send2 size={24} variant="Bold" color="white" />
        </button>
      </form>
    </div>
  );
}

export default MessageForm;
