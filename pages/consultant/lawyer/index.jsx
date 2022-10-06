import React, { useContext, useState } from "react";
import ConsultantLayout from "../../../layouts/Consultant";
import nookies from "nookies";
import axios from "axios";
import ConsultForm from "../../../components/Modal/ConsultForm";
import { AppContext } from "../../../context/appContext";

import { io } from "socket.io-client";
import {
  ArrowCircleLeft,
  ArrowCircleRight,
  SearchFavorite1,
  FilterSearch,
  Next,
  DeviceMessage,
  MessageText1,
  Building,
  User,
  Star1
} from "iconsax-react";
import Head from "next/head";
import { Router, useRouter } from "next/router";
import toast from "react-hot-toast";

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const user = cookies.user;

  const endpoint = process.env.API_URL + "/consultant?roleid=3";
  const config = {
    headers: {
      Authorization: cookies.token
    }
  };

  const res = await axios.get(endpoint, config);
  const data = await res.data.data;

  console.log(data);

  if (cookies.token) {
    return {
      props: {
        consultants: data || [],
        userInfo: JSON.parse(user)
      }
    };
  } else {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false
      }
    };
  }
}

export default function Lawyer({ consultants, userInfo }) {
  const [showModal, setShowModal] = useState(undefined);
  const [selectedTips, setSelectedTips] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("consultants", consultants);

<<<<<<< HEAD
  const { socket, setCurrentRoom, currentRoom, setMessages, messages, priverMemberMsg, setPrivateMemberMsg } = useContext(AppContext);
=======
  const {
    socket,
    setCurrentRoom,
    currentRoom,
    setMessages,
    messages,
    priverMemberMsg,
    setPrivateMemberMsg
  } = useContext(AppContext);
>>>>>>> ad11f2d (Enhance : Feature End Consultation Chat)

  const router = useRouter();

  const stepTips = [
    {
      icon: <SearchFavorite1 size="32" color="#FFF" />,
      desc: "Kamu bisa mencari konsultan yang ingin kamu ajak bicara!"
    },
    {
      icon: <FilterSearch size="32" color="#FFF" />,
      desc: "Kamu bisa memfilter konsultan berdasarkan nama, kota, dan juga jenis kelamin"
    },
    {
      icon: <Next size="32" color="#FFF" />,
      desc: "Ketika kamu ingin konsultasi, tekan button konsultasi dibawah"
    },
    {
      icon: <DeviceMessage size="32" color="#FFF" />,
      desc: "Lalu akan muncul pesan dan kamu bisa memasukan keluhan disana"
    },
    {
      icon: <MessageText1 size="32" color="#FFF" />,
      desc: "Klik kirim dan kamu akan diarahkan berbicara dengan konsultan"
    }
  ];

  function randomRoundedDecimal(min, max) {
    return Math.round((Math.random() * (max - min) + min) * 10) / 10;
  }

  const handleSubmit = async (id) => {
    setLoading(true);
    const cookies = nookies.get(null, "token");

    const data = {
      consultantId: id,
      problem: message
    };

    console.log(data);

    const endpoint = process.env.API_URL + "/booking";
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies.token
      }
    };

    try {
      const res = await axios.post(endpoint, data, options);
      if (res.status == 200) {
        toast.success("Berhasil mengajukan konsultasi");
        setCurrentRoom(res.data.data.data.chatId);
        setPrivateMemberMsg(res.data.data.data);
        setShowModal(undefined);
        router.replace("/chats");
        setMessage("");
      } else {
        toast.error("Gagal mengajukan konsultasi");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Konsultasi Bantuan Hukum - Consultio</title>
      </Head>

      <div className="container overflow-y-scroll scrollbar-hide pt-4 pb-10">
        <div className="header w-full flex flex-col items-center">
          <div
            className="header_title text-center mt-5"
            style={{
              fontSize: "25px",
              fontFamily: "Poppins"
            }}
          >
            <h3
              style={{
                fontFamily: "Poppins",
                fontSize: "25px",
                fontWeight: "bold"
              }}
            >
              Alur <br /> Konsultasi Bantuan Hukum
            </h3>
          </div>

          <div
            className="header_banner w-3/4 mt-10 rounded-2xl flex flex-col justify-center"
            style={{
              backgroundColor: "rgba(191, 192, 194, 0.2)",
              height: "167px"
            }}
          >
            <div className="flex justify-between items-center">
              <div className="ml-5 cursor-pointer">
                <ArrowCircleLeft
                  size="36"
                  color="#437EEB"
                  onClick={() =>
                    setSelectedTips((prevState) => {
                      if (prevState === 0) {
                        return prevState;
                      }

                      return prevState - 1;
                    })
                  }
                />
              </div>
              <div>
                <div className="flex items-center">
                  <div
                    className="w-28 h-28 rounded-full flex justify-center items-center mr-16"
                    style={{
                      backgroundColor: "#437EEB",
                      border: "5px solid #FFF"
                    }}
                  >
                    {stepTips[selectedTips].icon}
                  </div>
                  <p
                    className="w-96"
                    style={{
                      fontFamily: "Poppins",
                      fontStyle: "medium",
                      fontSize: "20px",
                      color: "rgba(0, 0, 0, 0.5)"
                    }}
                  >
                    {stepTips[selectedTips].desc}
                  </p>
                </div>
                <div className="w-full mt-2 flex justify-center items-center">
                  {stepTips.map((item, index) => {
                    if (index === selectedTips) {
                      return (
                        <div key={index} className="w-6 h-1 bg-blue-500 mr-4" />
                      );
                    }
                    return (
                      <div
                        key={index}
                        className="w-6 h-1 mr-4"
                        style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
                      ></div>
                    );
                  })}
                </div>
              </div>
              <div className="mr-5 cursor-pointer">
                <ArrowCircleRight
                  onClick={() =>
                    setSelectedTips((prevState) => {
                      if (prevState === stepTips.length - 1) {
                        return prevState;
                      }

                      return prevState + 1;
                    })
                  }
                  size="36"
                  color="#437EEB"
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="my-10" />

        <div className="w-full px-16">
          <h3
            className="mb-8"
            style={{
              fontFamily: "Poppins",
              fontSize: "25px",
              fontWeight: "bold"
            }}
          >
            Temukan Konsultan Terbaikmu <br /> Untuk Berbincang dengan Kamu!
          </h3>

          <div className="flex w-full gap-x-7">
            <div className="flex gap-x-5">
              <div className="rounded-lg border p-4">
                <User size="24" color="#292D32" />
              </div>
              <input
                placeholder="Nama Konsultan..."
                className="outline-none font-poppins bg-transparent rounded-lg py-3 px-8"
                style={{ border: "1px solid #EAEAEA" }}
              />
            </div>
            <div className="flex gap-x-5">
              <div className="rounded-lg border p-4">
                <Building size="24" color="rgba(41, 45, 50,0.6)" />
              </div>
              <input
                placeholder="Kota"
                className="outline-none font-poppins bg-transparent rounded-lg py-3 px-8"
                style={{ border: "1px solid #EAEAEA" }}
              />
            </div>
            <div className="flex">
              <div
                className="w-44 h-14 rounded-lg text-white flex justify-center items-center cursor-pointer"
                style={{ backgroundColor: "#437EEB", fontFamily: "Poppins" }}
              >
                Search
              </div>
            </div>
          </div>
        </div>

        <div className="w-full px-16 grid grid-cols-2 mb-10">
          {consultants.data.map((consultant, idx) => (
            <div key={idx} className="flex mt-10 w-3/4">
              <img
                src={`http://203.6.149.156:8480/public/${consultant.photo}`}
                className="w-60 h-36 object-cover object-center rounded-lg mr-8"
              />

              <div className="description overflow-hidden flex-1 h-full flex flex-col justify-between">
                <h3
                  style={{
                    fontFamily: "Poppins",
                    fontSize: "16px",
                    fontWeight: "bold"
                  }}
                >
                  {consultant.fullname}
                </h3>

                <div className="flex">
                  <Building
                    size="22"
                    className="mr-2"
                    color="rgba(41, 45, 50,0.6)"
                  />
                  {consultant.city || "-"}
                </div>

                <div className="flex items-center">
                  <Star1
                    size="22"
                    className="mr-2 text-yellow-400"
                    variant="Bold"
                  />
                  <p className="text-sm font-bold text-yellow-400">
                    {/* {randomRoundedDecimal(4, 5)} */}
                  </p>
                </div>
                <div className="w-full flex">
                  <div
                    onClick={() => setShowModal(idx)}
                    className="w-full bg-primary hover:bg-primary/90 duration-150 h-10 rounded-lg flex cursor-pointer justify-center items-center"
                    style={{
                      fontSize: "14px",
                      color: "#FFF"
                    }}
                  >
                    Konsultasi
                  </div>
                  {idx === showModal && (
                    <ConsultForm
                      socket={socket}
                      message={message}
                      onSubmit={() => handleSubmit(consultant.consultantId)}
                      onChange={(e) => setMessage(e.target.value)}
                      closeModal={() => setShowModal(undefined)}
                      loading={loading}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

Lawyer.layout = ConsultantLayout;
