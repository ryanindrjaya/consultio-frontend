import React, { useContext, useEffect, useState } from "react";
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

  if (cookies.token) {
    return {
      props: {
        data: data || [],
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

export default function Lawyer({ data, userInfo }) {
  const [showModal, setShowModal] = useState(undefined);
  const [consultants, setConsultants] = useState(data.data);
  const [selectedTips, setSelectedTips] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [searchName, setSearchName] = useState("");
  const [searchCity, setSearchCity] = useState("");

  const {
    socket,
    setCurrentRoom,
    currentRoom,
    setMessages,
    messages,
    priverMemberMsg,
    setPrivateMemberMsg
  } = useContext(AppContext);

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
      toast.error("Gagal mengajukan konsultasi");
    }
    setLoading(false);
  };

  const handleSearch = () => {
    setLoading(true);

    const filtered = consultants.filter((item) => {
      return (
        item.fullname.toLowerCase().includes(searchName.toLowerCase()) ||
        item?.city?.toLowerCase().includes(searchCity.toLowerCase())
      );
    });

    if (filtered.length > 0) {
      setConsultants(filtered);
    } else {
      toast.error("Data tidak ditemukan");
      setConsultants(data.data);
    }

    setLoading(false);
    setSearchName("");
    setSearchCity("");
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
            className="lg:w-3/4 mt-10 rounded-2xl flex flex-col justify-center"
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
                <div className="flex flex-col lg:flex-row justify-center items-center">
                  <div
                    className="w-14 h-14 lg:w-28 lg:h-28 rounded-full flex justify-center items-center lg:mr-16"
                    style={{
                      backgroundColor: "#437EEB",
                      border: "5px solid #FFF"
                    }}
                  >
                    {stepTips[selectedTips].icon}
                  </div>
                  <p
                    className="w-96 hidden md:block"
                    style={{
                      fontFamily: "Poppins",
                      fontStyle: "medium",
                      fontSize: "20px",
                      color: "rgba(0, 0, 0, 0.5)"
                    }}
                  >
                    {stepTips[selectedTips].desc}
                  </p>
                  <p
                    className="w-36 text-center mt-3 md:hidden"
                    style={{
                      fontFamily: "Poppins",
                      fontStyle: "medium",
                      fontSize: "12px",
                      color: "rgba(0, 0, 0, 0.5)"
                    }}
                  >
                    {stepTips[selectedTips].desc}
                  </p>
                </div>
                <div className="w-full mt-5 flex justify-center gap-x-5 items-center">
                  {stepTips.map((item, index) => {
                    if (index === selectedTips) {
                      return (
                        <div key={index} className="w-6 h-1 bg-blue-500 " />
                      );
                    }
                    return (
                      <div
                        key={index}
                        className="w-6 h-1 "
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

        <div className="w-full px-8 lg:px-16">
          <h3
            className="mb-8 text-xl lg:text-2xl"
            style={{
              fontFamily: "Poppins",
              fontWeight: "bold"
            }}
          >
            Temukan Konsultan Terbaikmu <br /> Untuk Berbincang dengan Kamu!
          </h3>

          <div className="flex flex-col gap-y-3 md:flex-row w-full gap-x-7">
            <div className="flex gap-x-5">
              <div className="rounded-lg border p-4">
                <User size="24" color="#292D32" />
              </div>
              <input
                onChange={(e) => setSearchName(e.target.value)}
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
                onChange={(e) => setSearchCity(e.target.value)}
                placeholder="Kota"
                className="outline-none font-poppins bg-transparent rounded-lg py-3 px-8"
                style={{ border: "1px solid #EAEAEA" }}
              />
            </div>
            <div className="flex mt-4 lg:mt-0">
              {loading ? (
                <div
                  className="w-44 h-14 rounded-lg text-white flex justify-center items-center cursor-pointer"
                  style={{ backgroundColor: "#437EEB", fontFamily: "Poppins" }}
                >
                  <svg
                    aria-hidden="true"
                    className="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-white fill-blue-600"
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
                <div
                  onClick={handleSearch}
                  className="w-44 h-14 rounded-lg text-white flex justify-center items-center cursor-pointer"
                  style={{ backgroundColor: "#437EEB", fontFamily: "Poppins" }}
                >
                  Search
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="w-full px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-2 mb-10">
          {loading ? (
            <div className="w-full h-96 flex justify-center items-center">
              <svg
                aria-hidden="true"
                className="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-white fill-blue-600"
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
            consultants.map((consultant, idx) => (
              <div key={idx} className="flex gap-x-6 mt-10 w-full lg:w-3/4">
                <div className="w-2/5">
                  <img
                    src={`http://203.6.149.156:8480/public/${consultant.photo}`}
                    className="w-full h-full lg:w-60 lg:h-36 object-cover object-center rounded-lg mr-8"
                  />
                </div>

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

                  <div className="flex items-center">
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
            ))
          )}
        </div>
      </div>
    </>
  );
}

Lawyer.layout = ConsultantLayout;
