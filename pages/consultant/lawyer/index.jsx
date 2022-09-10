import React, { useState } from "react";
import Home from "../../../layouts/Home";
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

export default function Lawyer() {
  const [selectedTips, setSelectedTips] = useState(0);

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
  return (
    <div className="container">
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
            Alur <br /> Konsultasi Kesehatan Mental
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

        <div className="flex w-full justify-between">
          <div className="flex w-1/3 justify-between">
            <div className="w-16 h-16 flex justify-center items-center rounded-lg border mr-5">
              <User size="24" color="#292D32" />
            </div>
            <input
              className="outline-none bg-transparent h-16 pl-3 w-96"
              style={{ border: "1px solid #EAEAEA" }}
            />
          </div>
          <div className="flex w-1/3 justify-between">
            <div className="w-16 h-16 flex justify-center items-center rounded-lg border mr-5">
              <Building size="24" color="rgba(41, 45, 50,0.6)" />
            </div>
            <input
              className="outline-none bg-transparent h-16 pl-3 w-96"
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
        <div className="flex mt-10 w-3/4">
          <img
            src="https://awsimages.detik.net.id/community/media/visual/2017/10/13/cba7b68a-c95b-46b5-a2e6-66ba7449cfd7_43.jpeg?w=700&q=90"
            className="w-60 h-36 object-cover object-center rounded-lg mr-8"
          />

          <div className="description overflow-hidden h-full flex flex-col justify-between">
            <h3
              style={{
                fontFamily: "Poppins",
                fontSize: "16px",
                fontWeight: "bold"
              }}
            >
              Ryan Alexander S.H M.H
            </h3>

            <div className="flex">
              <Building
                size="22"
                className="mr-2"
                color="rgba(41, 45, 50,0.6)"
              />
              Sragen
            </div>

            <div className="flex">
              <Star1
                size="22"
                className="mr-2"
                color="orange"
                variant="bold"
                style={{ color: "orange" }}
              />
              (4.5) 2000+ Review
            </div>
            <div className="w-full flex">
              <div
                className="w-full h-10 rounded-lg flex cursor-pointer justify-center items-center"
                style={{
                  backgroundColor: "#437EEB",
                  fontSize: "14px",
                  color: "#FFF"
                }}
              >
                Konsultasi
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-10 w-3/4">
          <img
            src="https://awsimages.detik.net.id/community/media/visual/2017/10/13/cba7b68a-c95b-46b5-a2e6-66ba7449cfd7_43.jpeg?w=700&q=90"
            className="w-60 h-36 object-cover object-center rounded-lg mr-8"
          />

          <div className="description h-full flex flex-col justify-between">
            <h3
              style={{
                fontFamily: "Poppins",
                fontSize: "16px",
                fontWeight: "bold"
              }}
            >
              Ryan Alexander S.H M.H
            </h3>

            <div className="flex">
              <Building
                size="22"
                className="mr-2"
                color="rgba(41, 45, 50,0.6)"
              />
              Sragen
            </div>

            <div className="flex">
              <Star1
                size="22"
                className="mr-2"
                color="orange"
                variant="bold"
                style={{ color: "orange" }}
              />
              (4.5) 2000+ Review
            </div>
            <div className="w-full flex justify-center items-center">
              <div
                className="w-full h-10 rounded-lg flex cursor-pointer justify-center items-center"
                style={{
                  backgroundColor: "#437EEB",
                  fontSize: "14px",
                  color: "#FFF"
                }}
              >
                Konsultasi
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-10 w-3/4">
          <img
            src="https://awsimages.detik.net.id/community/media/visual/2017/10/13/cba7b68a-c95b-46b5-a2e6-66ba7449cfd7_43.jpeg?w=700&q=90"
            className="w-60 h-36 object-cover object-center rounded-lg mr-8"
          />

          <div className="description overflow-hidden h-full flex flex-col justify-between">
            <h3
              style={{
                fontFamily: "Poppins",
                fontSize: "16px",
                fontWeight: "bold"
              }}
            >
              Ryan Alexander S.H M.H
            </h3>

            <div className="flex">
              <Building
                size="22"
                className="mr-2"
                color="rgba(41, 45, 50,0.6)"
              />
              Sragen
            </div>

            <div className="flex">
              <Star1
                size="22"
                className="mr-2"
                color="orange"
                variant="bold"
                style={{ color: "orange" }}
              />
              (4.5) 2000+ Review
            </div>
            <div className="w-full flex">
              <div
                className="w-full h-10 rounded-lg flex cursor-pointer justify-center items-center"
                style={{
                  backgroundColor: "#437EEB",
                  fontSize: "14px",
                  color: "#FFF"
                }}
              >
                Konsultasi
              </div>
            </div>
          </div>
        </div>
        <div className="flex mt-10 w-3/4">
          <img
            src="https://awsimages.detik.net.id/community/media/visual/2017/10/13/cba7b68a-c95b-46b5-a2e6-66ba7449cfd7_43.jpeg?w=700&q=90"
            className="w-60 h-36 object-cover object-center rounded-lg mr-8"
          />

          <div className="description h-full flex flex-col justify-between">
            <h3
              style={{
                fontFamily: "Poppins",
                fontSize: "16px",
                fontWeight: "bold"
              }}
            >
              Ryan Alexander S.H M.H
            </h3>

            <div className="flex">
              <Building
                size="22"
                className="mr-2"
                color="rgba(41, 45, 50,0.6)"
              />
              Kab. Sragen
            </div>

            <div className="flex">
              <Star1
                size="22"
                className="mr-2"
                color="orange"
                variant="bold"
                style={{ color: "orange" }}
              />
              (4.5) 2000+ Review
            </div>
            <div className="w-full flex justify-center items-center">
              <div
                className="w-full h-10 rounded-lg flex cursor-pointer justify-center items-center"
                style={{
                  backgroundColor: "#437EEB",
                  fontSize: "14px",
                  color: "#FFF"
                }}
              >
                Konsultasi
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Lawyer.layout = Home;
