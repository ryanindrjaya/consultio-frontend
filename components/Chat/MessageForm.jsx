import { ArrowLeft3, ArrowRight3, HambergerMenu, Send2 } from "iconsax-react";
import React, { useContext, useState } from "react";
import { AppContext } from "../../context/appContext";
import { useEffect } from "react";
import { useRef } from "react";
import nookies from "nookies";

function MessageForm({ user, showModal }) {
  const [message, setMessage] = useState("");
  const messageEndRef = useRef();
  const inputRef = useRef();
  const cookies = nookies.get(null);
  const { role } = cookies;

  const {
    socket,
    currentRoom,
    setMessages,
    joinedRoom,
    messages,
    setCurrentRoom,
    sidebarChat,
    setSidebarChat,
    statusChat
  } = useContext(AppContext);

  useEffect(() => {
    socket.emit("chat-detail", {
      userId: user.userId,
      chatId: currentRoom.chatId
    });
    // messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [setCurrentRoom]);

  useEffect(() => {
    socket.emit("chat-detail", {
      userId: user.userId,
      chatId: currentRoom.chatId
    });
    inputRef.current.focus();
  }, [currentRoom]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  socket.off("message-log").on("message-log", (data) => {
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
    const receiver =
      currentRoom.sender === userId ? currentRoom.receiver : currentRoom.sender;

    socket.emit("send-message", {
      chatId,
      sender: userId,
      receiver,
      message
    });

    setMessages((prev) => [
      ...prev,
      { message, sender: userId, receiver: receiver }
    ]);
    setMessage("");
  }

  return joinedRoom ? (
    <div className="sideright flex flex-col justify-between h-full overflow-y-hidden w-full lg:w-3/5 scrollbar-hide border-r">
      <div className="w-full bg-primary">
        <div
          className="w-full flex items-center"
          style={{
            backgroundColor: "#437EEB",
            height: "20%",
            minHeight: "104px"
          }}
        >
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center">
              <div className="lg:hidden block bg-white p-1 rounded-md cursor-pointer ml-4">
                <HambergerMenu
                  onClick={() => setSidebarChat(true)}
                  className="text-primary"
                />
              </div>
              <img
                src={`http://203.6.149.156:8480/public/${
                  currentRoom.sender === user.userId
                    ? currentRoom.receiverPhoto
                    : currentRoom.senderPhoto
                }`}
                className="rounded-full h-12 w-12 lg:h-16 lg:w-16 object-cover object-center mx-2 lg:mx-6 border"
              />

              <h5 className="text-md lg:text-lg font-medium w-8 md:w-auto text-white font-inter mr-4 md:mr-0">
                {currentRoom.sender === user.userId
                  ? currentRoom.receiverName
                  : currentRoom.senderName}
              </h5>
            </div>
            {role !== "USER" && (
              <div>
                {statusChat && (
                  <button
                    onClick={() => {
                      showModal();
                    }}
                    className="bg-red-600 text-white rounded-xl h-4 w-20 lg:w-32 p-6 mx-6 flex items-center justify-center"
                  >
                    End Chat
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full scroll-smooth flex-1 relative chat-list overflow-y-scroll scrollbar-hide -z-10">
        {messages.length > 0 && (
          <>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chat flex ${
                  user.userId !== msg.sender ? "justify-start" : "justify-end"
                }`}
                style={{ minHeight: "64px" }}
              >
                <div
                  className={`inline-block break-words ${
                    user.userId === msg.sender ? "text-white" : "text-gray-800"
                  } m-2 p-5`}
                  style={{
                    backgroundColor:
                      user.userId !== msg.sender
                        ? "rgba(0, 0, 0, 0.1)"
                        : "#437EEB",
                    borderRadius:
                      user.userId !== msg.sender
                        ? "0 15px 15px 15px"
                        : "15px 0 15px 15px",
                    maxWidth: "60%"
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
            backgroundColor: "rgba(0, 0, 0, 0.1)"
          }}
        />

        <button
          type="submit"
          disabled={!message || currentRoom == {}}
          onClick={sendMessage}
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
