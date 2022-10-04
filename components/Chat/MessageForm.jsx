import { Send2 } from "iconsax-react";
import React, { useContext, useState } from "react";
import { AppContext } from "../../context/appContext";
import nookies from "nookies";
import { useEffect } from "react";
import { useRef } from "react";

function MessageForm({ user }) {
  const cookies = nookies.get(null);
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState([]);
  const [chatDetail, setChatDetail] = useState([]);
  const messageEndRef = useRef();
  const inputRef = useRef();

  const { socket, currentRoom, setMessages, joinedRoom, messages, setCurrentRoom, privateMemberMsg, setPrivateMemberMsg } = useContext(AppContext);
  console.log("currentRoom", currentRoom);

  useEffect(() => {
    socket.emit("chat-detail", { userId: user.userId, chatId: currentRoom.chatId });
    // messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [setCurrentRoom]);

  useEffect(() => {
    socket.emit("chat-detail", { userId: user.userId, chatId: currentRoom.chatId });
    inputRef.current.focus();
  }, [currentRoom]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  socket.off("message-log").on("message-log", (data) => {
    console.log("message log", data);
    setMessages((prev) => [...prev, data]);
    messageEndRef.current.scrollIntoView();
  });

  socket.off("message-detail").on("message-detail", (data) => {
    setMessages(data);
  });

  async function sendMessage(e) {
    e.preventDefault();
    const chatId = currentRoom.chatId;
    const userId = user.userId;
    const receiver = currentRoom.sender === userId ? currentRoom.receiver : currentRoom.sender;

    socket.emit("send-message", {
      chatId,
      sender: userId,
      receiver,
      message,
    });
    setMessages((prev) => [...prev, { message, sender: userId, receiver: receiver }]);
    setMessage("");
  }

  return joinedRoom ? (
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
              src={`http://203.6.149.156:8480/public/${currentRoom.sender === user.userId ? currentRoom.receiverPhoto : currentRoom.senderPhoto}`}
              className="rounded-full h-16 w-16 object-cover object-center mx-6 border"
            />

            <h5 className="text-lg font-medium text-white font-inter">
              {currentRoom.sender === user.userId ? currentRoom.receiverName : currentRoom.senderName}
            </h5>
          </div>
        </div>
      </div>

      <div className="w-full scroll-smooth flex-1 relative chat-list overflow-y-scroll scrollbar-hide">
        {messages.length > 0 && (
          <>
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat flex ${user.userId !== msg.sender ? "justify-start" : "justify-end"}`} style={{ minHeight: "64px" }}>
                <div
                  className={`inline-block break-words ${user.userId === msg.sender ? "text-white" : "text-gray-800"} m-2 p-5`}
                  style={{
                    backgroundColor: user.userId !== msg.sender ? "rgba(0, 0, 0, 0.1)" : "#437EEB",
                    borderRadius: user.userId !== msg.sender ? "0 15px 15px 15px" : "15px 0 15px 15px",
                    maxWidth: "60%",
                  }}
                >
                  <p>{msg.message}</p>
                </div>
              </div>
            ))}
          </>
        )}
        <div ref={messageEndRef} className="scroll-smooth"></div>
      </div>

      <form className="w-full relative mb-5 mt-3 h-14 px-4">
        <input
          disabled={currentRoom.chatId === undefined || !messages}
          value={message}
          ref={inputRef}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-full pl-8 pr-20 relative rounded-full outline-none focus:outline-primary duration-300"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          }}
        />

        <button
          onClick={sendMessage}
          type="submit"
          disabled={!message || currentRoom == {}}
          className="bg-primary cursor-pointer rounded-full absolute top-1 right-6 p-3"
        >
          <Send2 size={24} variant="Bold" color="white" />
        </button>
      </form>
    </div>
  ) : (
    <>
      <div ref={messageEndRef} className="scroll-smooth"></div>
      <input type="text" hidden ref={inputRef} />
    </>
  );
}

export default MessageForm;
