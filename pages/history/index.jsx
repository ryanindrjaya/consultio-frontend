import { ArrowSquareRight } from "iconsax-react";
import React, { useState } from "react";
import HistoryLayout from "../../layouts/History";
import nookies from "nookies";
import axios from "axios";
import moment from "moment";
import "moment/locale/id";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import CheckIcon from "@mui/icons-material/Check";
import { motion } from "framer-motion";
import Head from "next/head";

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);

  const res = await fetchData(cookies, "PSYCHOLOGIST");
  const data = (await res.json()) || [];

  return {
    props: {
      data: data
    }
  };
}

const fetchData = async (cookies, category) => {
  try {
    const endpoint = process.env.API_URL + `/booking?type=${category}`;

    const config = {
      method: "GET",
      headers: {
        Authorization: cookies.token
      }
    };

    const req = await fetch(endpoint, config);

    return req;
  } catch (error) {
    toast("Terjadi kesalahan saat mengambil data");
  }
};

export default function History({ data }) {
  const [category, setCategory] = useState("PSYCHOLOGIST");
  const [bookings, setBookings] = useState(
    data.data.data ? filterCategory(data.data.data) : []
  );
  moment.locale("id");

  useEffect(() => {
    const newData = filterCategory(data.data.data);
    setBookings(newData);
  }, [category]);

  function filterCategory(arr) {
    return arr?.filter((item) => item.type === category);
  }

  const spring = {
    type: "spring",
    stiffness: 300,
    damping: 40
  };

  return (
    <>
      <Head>
        <title>History - Consultio</title>
      </Head>
      <div className="w-full px-8 py-6">
        <div className="w-full relative flex bg-black/20 hover:bg-blue-600/50 group rounded-lg pointer-events-none duration-150">
          <motion.div
            layout
            transition={spring}
            className={`absolute ${
              category === "PSYCHOLOGIST" ? "left-0" : "right-0"
            } w-1/2 h-full bg-primary rounded-lg`}
          ></motion.div>
          <div
            onClick={() => setCategory("PSYCHOLOGIST")}
            className={`w-1/2 cursor-pointer ${
              category === "LAWYER" ? "pointer-events-auto" : ""
            } relative z-50 rounded-lg px-4 lg:px-0 py-2 lg:py-4 flex justify-center items-center`}
          >
            <h2 className="font-poppins text-white font-medium text-center lg:text-left">
              Konsultasi Kesehatan Mental
            </h2>
          </div>
          <div
            onClick={() => setCategory("LAWYER")}
            className={`w-1/2 ${
              category === "PSYCHOLOGIST" ? "pointer-events-auto" : ""
            } cursor-pointer relative z-50 duration-150 rounded-lg px-4 lg:px-0 py-2 lg:py-4 flex justify-center items-center`}
          >
            <h2 className="font-poppins text-white font-medium text-center lg:text-left">
              Konsultasi Hukum
            </h2>
          </div>
        </div>

        {/* History Card */}
        <div className="w-full grid grid-cols-1 mt-9 gap-x-5 gap-y-5">
          {bookings?.length > 0 ? (
            bookings?.map((booking, idx) => (
              <div
                key={idx}
                style={{ borderColor: "#437EEB" }}
                className="w-full col-span-1 flex justify-between items-center  border-2 rounded-lg"
              >
                <div className="flex flex-col lg:flex-row gap-x-6 px-4 py-2">
                  <img
                    src="https://interclinical.com.au/wp-content/uploads/2019/11/shutterstock_580538548-scaled.jpg"
                    className="w-20 lg:w-32 h-20 lg:h-32 object-cover object-center rounded-lg"
                    alt=""
                  />
                  <div className="flex mx-2 mt-3 flex-col justify-center font-poppins">
                    <h1 className="font-medium text-base">
                      {booking.consultantName}
                    </h1>
                    <p className="text-xs text-black/40">
                      {moment(booking.updatedAt).format("LL")}
                    </p>
                    {booking.isActive === 1 ? (
                      <h3 className="text-sm xl:text-md text-blue-700/70 mt-4">
                        Sedang berjalan
                      </h3>
                    ) : (
                      <h3 className="text-sm xl:text-md text-green-700/70 mt-4">
                        Selesai <CheckIcon />
                      </h3>
                    )}
                  </div>
                </div>
                <Link href={`/history/booking/${booking.bookingId}`}>
                  <div className="group cursor-pointer transition-all duration-300 w-3/6 lg:w-1/6 bg-primary/0 hover:bg-primary h-full rounded-l-lg flex flex-col justify-center items-center">
                    <ArrowSquareRight
                      size={32}
                      className="text-primary transition-all duration-300 group-hover:text-white"
                    />
                    <p className="hidden transition-all duration-300 group-hover:block font-poppins font-medium text-xs mt-2 text-white">
                      Lihat Riwayat
                    </p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="w-full lg:col-span-2 flex justify-center items-center">
              <h2 className="font-poppins text-gray-500 font-medium text-lg">
                Tidak ada riwayat konsultasi
              </h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

History.layout = HistoryLayout;
