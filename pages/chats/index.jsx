import React from "react";
import { Send2 } from "iconsax-react";
import Home from "../../layouts/Home";

export default function Chats() {
  return (
    <div
      style={{ height: "92vh" }}
      className="container flex w-full h-6/12 overflow-hidden scrollbar-hide"
    >
      <div className="sideleft h-screen w-2/5 border-r scrollbar-hide">
        <div className="profile-list h-screen overflow-y-scroll scrollbar-hide">
          <div className="profile-chat flex ml-8 mt-8">
            <img
              src={
                "https://www.nicepng.com/png/full/73-730154_open-default-profile-picture-png.png"
              }
              width="65px"
              height="65px"
              className="rounded-full border mr-5"
            />

            <div className="flex w-full justify-between">
              <div className="flex flex-col justify-between">
                <h5 style={{ fontSize: "16px", fontWeight: "bold" }}>
                  Raditya
                </h5>
                <p>Hello World</p>
              </div>
              <div className="flex flex-col w-10 justify-between items-center mr-10">
                <p style={{ fontWeight: "medium", fontSize: "14px" }}>05.00</p>

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
          <div className="profile-chat flex ml-8 mt-8">
            <img
              src={
                "https://www.nicepng.com/png/full/73-730154_open-default-profile-picture-png.png"
              }
              width="65px"
              height="65px"
              className="rounded-full border mr-5"
            />

            <div className="flex w-full justify-between">
              <div className="flex flex-col justify-between">
                <h5 style={{ fontSize: "16px", fontWeight: "bold" }}>
                  Raditya
                </h5>
                <p>Hello World</p>
              </div>
              <div className="flex flex-col w-10 justify-between items-center mr-10">
                <p style={{ fontWeight: "medium", fontSize: "14px" }}>05.00</p>

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

          <div className="profile-chat flex ml-8 mt-8">
            <img
              src={
                "https://www.nicepng.com/png/full/73-730154_open-default-profile-picture-png.png"
              }
              width="65px"
              height="65px"
              className="rounded-full border mr-5"
            />

            <div className="flex w-full justify-between">
              <div className="flex flex-col justify-between">
                <h5 style={{ fontSize: "16px", fontWeight: "bold" }}>
                  Raditya
                </h5>
                <p>Hello World</p>
              </div>
              <div className="flex flex-col w-10 justify-between items-center mr-10">
                <p style={{ fontWeight: "medium", fontSize: "14px" }}>05.00</p>

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
          <div className="profile-chat flex ml-8 mt-8">
            <img
              src={
                "https://www.nicepng.com/png/full/73-730154_open-default-profile-picture-png.png"
              }
              width="65px"
              height="65px"
              className="rounded-full border mr-5"
            />

            <div className="flex w-full justify-between">
              <div className="flex flex-col justify-between">
                <h5 style={{ fontSize: "16px", fontWeight: "bold" }}>
                  Raditya
                </h5>
                <p>Hello World</p>
              </div>
              <div className="flex flex-col w-10 justify-between items-center mr-10">
                <p style={{ fontWeight: "medium", fontSize: "14px" }}>05.00</p>

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
        </div>
      </div>
      <div className="sideright flex flex-col justify-between h-full overflow-y-hidden w-3/5 scrollbar-hide border-r">
        <div className="w-full mb-5">
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
                src={
                  "https://www.nicepng.com/png/full/73-730154_open-default-profile-picture-png.png"
                }
                width="65px"
                height="65px"
                className="rounded-full mx-6 border"
              />

              <h5 className="text-lg font-medium text-white font-inter">
                Charlie Puth
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
          <div className="chat" style={{ minHeight: "64px" }}>
            <div
              className="absolute right-0 m-3 p-5"
              style={{
                backgroundColor: "#4784DE",
                color: "white",
                borderRadius: "15px 15px 0 15px",
              }}
            >
              right
            </div>
          </div>

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
          <div className="chat" style={{ minHeight: "64px" }}>
            <div
              className="absolute right-0 m-3 p-5"
              style={{
                backgroundColor: "#4784DE",
                color: "white",
                borderRadius: "15px 15px 0 15px",
              }}
            >
              right
            </div>
          </div>
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
          <div className="chat" style={{ minHeight: "64px" }}>
            <div
              className="absolute right-0 m-3 p-5"
              style={{
                backgroundColor: "#4784DE",
                color: "white",
                borderRadius: "15px 15px 0 15px",
              }}
            >
              right
            </div>
          </div>

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
          <div className="chat" style={{ minHeight: "64px" }}>
            <div
              className="absolute right-0 m-3 p-5"
              style={{
                backgroundColor: "#4784DE",
                color: "white",
                borderRadius: "15px 15px 0 15px",
              }}
            >
              right
            </div>
          </div>
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
          <div className="chat" style={{ minHeight: "64px" }}>
            <div
              className="absolute right-0 m-3 p-5"
              style={{
                backgroundColor: "#4784DE",
                color: "white",
                borderRadius: "15px 15px 0 15px",
              }}
            >
              right
            </div>
          </div>

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
          <div className="chat" style={{ minHeight: "64px" }}>
            <div
              className="absolute right-0 m-3 p-5"
              style={{
                backgroundColor: "#4784DE",
                color: "white",
                borderRadius: "15px 15px 0 15px",
              }}
            >
              right
            </div>
          </div>
        </div>

        <div className="w-full relative mb-9 h-14 px-4">
          <input
            className="w-full h-full relative rounded-full mt-5"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            }}
          />

          <div style={{ backgroundColor: "#4784DE" }}>
            <Send2 size={32} variant="Bold" color="white" />
          </div>
        </div>
      </div>
    </div>
  );
}

Chats.layout = Home;
