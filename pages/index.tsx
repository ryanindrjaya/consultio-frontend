import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { Button } from "@mui/material";
import LandingPage from "../layouts/LandingPage";
import { useEffect, useState } from "react";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";

export default function Home() {
  const testimoni = [
    {
      nama: "Adiat Rahman",
      quote:
        "Consultio sangat membantu saya dalam menyelesaikan keresahan saya pada suatu masalah",
      jabatan: "Website Development Coordinator",
      tempat: "AIESEC Indonesia",
      photo: "Adiat 1.svg",
    },
    {
      nama: "Ryan Indrajaya",
      quote:
        "Consultio merupakan platform yang dibutuhkan oleh generasi saat ini",
      jabatan: "Front-end Developer",
      tempat: "Meta",
      photo: "Ryan 1.svg",
    },
  ];

  const [index, setIndex] = useState(0);
  const [current, setCurrent] = useState(testimoni[index]);
  const [max, setMax] = useState(false);
  const [min, setMin] = useState(true);

  const handlePrev = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (index <= testimoni.length - 1) {
      setIndex((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (index == 0) {
      setMin(true);
    } else {
      setMin(false);
    }

    if (index == testimoni.length - 1) {
      setMax(true);
    } else {
      setMax(false);
    }

    setCurrent(testimoni[index]);
  }, [setIndex, index]);

  return (
    <div className="">
      <Head>
        <title>Consultio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section id="hero1" className="flex w-full items-center pt-24">
          <div className="w-2/4">
            <div className="w-fit relative">
              <h2
                style={{ zIndex: 10 }}
                className="font-inter font-bold text-4xl"
              >
                Consultio
              </h2>
              <div
                style={{ zIndex: 0 }}
                className=" absolute bottom-1 w-full h-2 bg-primary opacity-60"
              ></div>
            </div>
            <p className="mb-5 font-inter text-xl font-normal">
              Bicarakan keluh kesahmu disini agar ketenangan menghampirimu!
            </p>
            <button
              className="px-6 py-2 font-medium rounded-lg border hover:bg-primary duration-100 hover:text-white"
              style={{ borderColor: "#437EEB" }}
            >
              View More
            </button>
          </div>

          <img src="/hero.svg" className="h-3/5" alt="" />
        </section>

        <section id="hero2" className="mt-32 flex gap-x-20 mb-52">
          <div className="relative">
            <div
              className="w-96 h-96 opacity-10 rounded-2xl"
              style={{ backgroundColor: "#437EEB" }}
            ></div>
            <img src="/hero2.svg" className="absolute bottom-0" alt="" />
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="font-inter font-bold text-5xl mb-6">
              Our <span className="text-primary">Vision</span> and{" "}
              <span className="text-primary">Mission</span>
            </h2>
            <p className="font-normal text-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </section>

        <section className="hero3">
          <div className="mb-11">
            <h2 className="font-inter font-bold text-5xl">
              Mulailah langkah mu dengan
            </h2>
            <div className="w-fit z-40 relative">
              <h2 className="font-inter static font-bold text-5xl">
                Consultio
              </h2>
              <div className="absolute z-10 bottom-1 w-full h-2 bg-primary opacity-60"></div>
            </div>
          </div>

          <div className="flex flex-wrap lg:flex-nowrap gap-x-9 gap-y-11 mb-11">
            <div className="w-full lg:w-2/4 hover:bg-primary hover:text-white duration-75 bg-primary/10 rounded-xl shadow-md p-5 flex gap-x-5">
              <div className="bg-white lg:w-2/5 rounded-xl shadow-md px-3 py-2">
                <img src="/collage 1.svg" alt="" />
              </div>
              <div className="lg:w-3/5">
                <h3 className="font-inter font-bold text-xl">Diskusi</h3>
                <p className="font-normal text-lg">
                  Diskusi, berbagi, dan memberi perlindungan kepada sesama
                  adalah obat terbaik
                </p>
              </div>
            </div>

            <div className="w-full lg:w-2/4 hover:bg-primary hover:text-white duration-75 bg-primary/10 rounded-xl shadow-md p-5 flex gap-x-5">
              <div className="bg-white rounded-xl lg:w-2/5 shadow-md px-3 py-2 relative flex justify-center">
                {/* <img
                  src="/collage 2.svg"
                  className="absolute bottom-0"
                  alt=""
                /> */}
              </div>
              <div className="lg:w-3/5">
                <h3 className="font-inter font-bold text-xl">
                  Konsultasi Bantuan Hukum
                </h3>
                <p className="font-normal text-lg">
                  Kami akan mendengarkan keluh kesahmu dan mencari solusi
                  bersama disini dengan konsultas hukum yang terpercaya
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap lg:flex-nowrap gap-x-9 gap-y-11">
            <div className="w-full lg:w-2/4 hover:bg-primary hover:text-white duration-75 bg-primary/10 rounded-xl shadow-md p-5 flex gap-x-5">
              <div className="bg-white lg:w-2/5 rounded-xl shadow-md px-3 py-2">
                <img src="/collage 3.svg" alt="" />
              </div>
              <div className="lg:w-3/5">
                <h3 className="font-inter font-bold text-xl">
                  Konsultasi Kesehatan Mental
                </h3>
                <p className="font-normal text-lg">
                  Kami akan mendengarkan keluh kesahmu dan mencari solusi
                  bersama konsultan kesehatan mental yang terpercaya
                </p>
              </div>
            </div>

            <div className="w-full lg:w-2/4 hover:bg-primary hover:text-white duration-75 bg-primary/10 rounded-xl shadow-md p-5 flex gap-x-5">
              <div className="bg-white rounded-xl lg:w-2/5 shadow-md px-3 py-2 relative flex justify-center">
                {/* <img
                  src="/collage 4.svg"
                  className="absolute bottom-0"
                  alt=""
                /> */}
              </div>
              <div className="lg:w-3/5">
                <h3 className="font-inter font-bold text-xl">
                  Bantuan Sekarang
                </h3>
                <p className="font-normal text-lg">
                  Kami akan membantu anda secepat yang kami bisa,
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-40 mb-32">
          <div className="text-center mb-24">
            <h2 className="font-inter font-bold text-5xl">
              Apa yang mereka katakan
            </h2>
            <div className="flex justify-center">
              <div className="flex justify-center gap-x-3">
                <h2 className="font-inter font-bold text-5xl">tentang</h2>
                <div className="w-fit relative">
                  <h2 className="font-inter z-20 font-bold text-5xl">
                    Consultio
                  </h2>
                  <div className=" absolute z-0 bottom-1 w-full h-2 bg-primary opacity-60"></div>
                </div>
              </div>
              <h2 className="font-inter font-bold text-5xl">?</h2>
            </div>
          </div>

          <div
            className="px-20 py-16 flex bg-primary/10 shadow-xl relative transition-all"
            style={{ borderRadius: 40, height: 460 }}
          >
            <div className="lg:w-3/5 flex flex-col justify-end">
              <h4 className="font-inter leading-snug font-medium text-4xl mb-6">
                {current.quote}
              </h4>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-inter font-semibold text-4xl text-primary">
                    {current.nama}
                  </p>
                </div>
                <div className="flex">
                  <button
                    onClick={(e) => handlePrev()}
                    disabled={min ? true : false}
                  >
                    <ArrowLeft2
                      size={32}
                      className={
                        min
                          ? "text-gray-900/20 cursor-pointer"
                          : "text-primary cursor-pointer"
                      }
                    />
                  </button>
                  <button
                    onClick={(e) => handleNext()}
                    disabled={max ? true : false}
                  >
                    <ArrowRight2
                      size={32}
                      className={
                        max
                          ? "text-gray-900/20 cursor-pointer"
                          : "text-primary cursor-pointer"
                      }
                    />
                  </button>
                </div>
              </div>
              <p className="text-inter font-medium text-2xl text-black/60">
                {current.jabatan}
              </p>
              <p className="text-inter font-medium text-2xl text-black/60">
                at {current.tempat}
              </p>
            </div>
            <div className="lg:w-2/5">
              <img
                src={`/${current.photo}`}
                className="absolute bottom-0 right-8"
                style={{ width: 366 }}
                alt=""
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

Home.layout = LandingPage;
