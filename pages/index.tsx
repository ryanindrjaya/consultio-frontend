import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { Button } from "@mui/material";
import LandingPage from "../layouts/LandingPage";
import { useEffect, useState } from "react";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { useSwipeable } from "react-swipeable";

import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [position, setPosition] = useState(0);

  const testimoni = [
    {
      nama: "Adiat Rahman",
      quote: "Consultio sangat membantu saya dalam menyelesaikan keresahan saya pada suatu masalah",
      jabatan: "Website Development Coordinator",
      tempat: "AIESEC Indonesia",
      photo: "Adiat 1.svg",
      width: 155,
    },
    {
      nama: "Ryan Indrajaya",
      quote: "Consultio merupakan platform yang dibutuhkan oleh generasi saat ini",
      jabatan: "Front-end Developer",
      tempat: "Meta",
      photo: "Ryan 1.svg",
      width: 141,
    },
  ];

  const [index, setIndex] = useState(0);
  const [current, setCurrent] = useState(testimoni[index]);
  const [max, setMax] = useState(false);
  const [min, setMin] = useState(true);

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleNext = () => {
    if (index <= testimoni.length - 1) {
      setIndex(index + 1);
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

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (position < testimoni.length - 1) {
        setPosition(position + 1);
      }
    },
    onSwipedRight: () => {
      if (position > 0) {
        setPosition(position - 1);
      }
    },
  });

  return (
    <div className="scroll-smooth overflow-hidden">
      <Head>
        <title>Consultio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <section id="hero1" className="flex w-full h-screen px-20 lg:px-0 lg:h-auto items-center pt-24">
          <div className="w-full lg:w-2/4">
            <div className="w-fit relative">
              <h2 style={{ zIndex: 10 }} className="font-inter font-bold relative z-10 text-4xl">
                Consultio
              </h2>
              <motion.div
                initial={{ opacity: 0.2, width: 0 }}
                animate={{ opacity: 0.6, width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{ zIndex: 0 }}
                className="z-20 absolute bottom-1 h-2 bg-primary opacity-60"
              ></motion.div>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mb-5 font-inter text-xl mt-2 font-normal"
            >
              Bicarakan keluh kesahmu disini agar ketenangan menghampirimu!
            </motion.p>
            <motion.a initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} href="#hero2">
              <button
                className="px-6 py-2 font-medium rounded-lg border hover:bg-primary duration-100 hover:text-white"
                style={{ borderColor: "#437EEB" }}
              >
                View More
              </button>
            </motion.a>
          </div>

          <motion.img
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            src="/hero.png"
            className="hidden lg:block lg:h-3/5"
            alt=""
          />
        </section>

        <section id="hero2" className="mt-32 flex flex-col lg:flex-row items-center gap-x-20 mb-52">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.1 }}
              transition={{
                duration: 0.4,
                delay: 0.7,
              }}
              className="w-96 h-96 scale-90 lg:scale-100 rounded-2xl"
              style={{ backgroundColor: "#437EEB" }}
            ></motion.div>
            <img src="/hero2.svg" className="absolute scale-90 lg:scale-100 bottom-0" alt="" />
          </div>

          <motion.div
            initial={{ x: 200, opacity: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.1,
            }}
            whileInView={{ x: 0, opacity: 1 }}
            className="flex flex-col justify-center"
          >
            <h2 className="font-inter font-bold text-3xl lg:text-5xl mt-6 lg:mt-0 mb-6 text-center lg:text-left">
              Our{" "}
              <motion.span
                initial={{ color: "#000" }}
                whileInView={{ color: "#437EEB" }}
                transition={{
                  duration: 0.4,
                  delay: 0.7,
                }}
              >
                Vision
              </motion.span>{" "}
              and{" "}
              <motion.span
                initial={{ color: "#000" }}
                whileInView={{ color: "#437EEB" }}
                transition={{
                  duration: 0.4,
                  delay: 0.7,
                }}
              >
                Mission
              </motion.span>
            </h2>
            <p className="font-normal text-lg lg:text-xl leading-loose text-justify px-10 lg:px-0">
              Visi kami adalah menciptakan ruang edukasi publik dan pendampingan bagi penyintas kekerasan seksual. Misi untuk merealisasikan ruang
              aman tersebut, kami menciptakan ruang diskusi dan memberikan akses mudah bagi penyintas kekerasan seksual untuk melakukan konsultasi
              psikologi, konsultasi hukum, dan bantuan langsung.
            </p>
          </motion.div>
        </section>

        <section className="hero3">
          <div className="mb-11 px-4 lg:px-0">
            <h2 className="font-inter font-bold text-4xl lg:text-5xl">Mulailah langkah mu dengan</h2>
            <div className="w-fit relative">
              <h2 className="font-inter relative z-20 font-bold text-4xl lg:text-5xl">Consultio</h2>
              <motion.div
                initial={{ opacity: 0.2, width: 0 }}
                whileInView={{ opacity: 0.6, width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
                style={{ zIndex: 0 }}
                className="z-20 absolute bottom-1 h-2 bg-primary opacity-60"
              ></motion.div>
            </div>
          </div>

          <div className="flex flex-wrap px-4 lg:px-0 lg:flex-nowrap gap-x-9 gap-y-11 mb-11">
            <motion.div
              initial={{ opacity: 0, x: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="w-full cursor-pointer max-h-44 lg:max-h-full lg:w-2/4 hover:bg-primary hover:text-white duration-75 bg-primary/10 rounded-xl shadow-md p-5 flex gap-x-5"
            >
              <div className="bg-white w-2/5 rounded-xl shadow-md px-3 py-2 flex justify-center items-center">
                <img src="/collage 1.svg" alt="" />
              </div>
              <div className="w-3/5 overflow-clip">
                <h3 className="font-inter font-bold text-xl">Diskusi</h3>
                <p className="font-normal text-lg ">Diskusi, berbagi, dan memberi perlindungan kepada sesama adalah obat terbaik</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-full cursor-pointer max-h-44 lg:max-h-full lg:w-2/4 hover:bg-primary hover:text-white duration-75 bg-primary/10 rounded-xl shadow-md p-5 flex gap-x-5"
            >
              <div className="bg-white w-2/5 rounded-xl shadow-md px-3 py-2 flex justify-center items-center">
                <img src="/collage2.png" className="" alt="" />
              </div>
              <div className="w-3/5 overflow-clip">
                <h3 className="font-inter font-bold text-xl ">Konsultasi Bantuan Hukum</h3>
                <p className="font-normal text-lg ">
                  Kami akan mendengarkan keluh kesahmu dan mencari solusi bersama disini dengan konsultan hukum yang terpercaya
                </p>
              </div>
            </motion.div>
          </div>

          <div className="flex flex-wrap px-4 lg:px-0 lg:flex-nowrap gap-x-9 gap-y-11">
            <motion.div
              initial={{ opacity: 0, x: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="w-full cursor-pointer max-h-44 lg:max-h-full lg:w-2/4 hover:bg-primary hover:text-white duration-75 bg-primary/10 rounded-xl shadow-md p-5 flex gap-x-5"
            >
              <div className="bg-white w-2/5 rounded-xl shadow-md px-3 py-2 flex justify-center items-center">
                <img src="/collage 3.svg" alt="" />
              </div>
              <div className="w-3/5 overflow-clip">
                <h3 className="font-inter font-bold text-xl">Konsultasi Kesehatan Mental</h3>
                <p className="font-normal text-lg ">
                  Kami akan mendengarkan keluh kesahmu dan mencari solusi bersama konsultan kesehatan mental yang terpercaya
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-full cursor-pointer max-h-44 lg:max-h-full lg:w-2/4 hover:bg-primary hover:text-white duration-75 bg-primary/10 rounded-xl shadow-md p-5 flex gap-x-5"
            >
              <div className="bg-white rounded-xl w-2/5 shadow-md px-3 py-2 relative flex justify-center">
                <img src="/collage 4.png" className="object-cover rounded-xl" />
              </div>
              <div className="w-3/5 overflow-clip">
                <h3 className="font-inter font-bold text-xl">Bantuan Sekarang</h3>
                <p className="font-normal text-lg ">Kami akan membantu anda secepat yang kami bisa</p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mt-40 mb-32">
          <div className="text-center mb-32 lg:mb-24">
            <h2 className="font-inter font-bold text-4xl lg:text-5xl">Apa yang mereka katakan</h2>
            <div className="flex justify-center">
              <div className="flex justify-center gap-x-3">
                <h2 className="font-inter font-bold text-4xl lg:text-5xl">tentang</h2>
                <div className="w-fit relative">
                  <h2 className="font-inter relative z-20 font-bold text-4xl lg:text-5xl">Consultio</h2>
                  <motion.div
                    initial={{ opacity: 0.2, width: 0 }}
                    whileInView={{ opacity: 0.6, width: "100%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    style={{ zIndex: 0 }}
                    className="z-20 absolute bottom-3 lg:bottom-1 h-2 bg-primary opacity-60"
                  ></motion.div>
                </div>
              </div>
              <h2 className="font-inter font-bold text-5xl">?</h2>
            </div>
          </div>

          {/* For Desktop */}
          <div
            className="hidden px-20 mx-10 lg:mx-0 py-16 lg:flex flex-col-reverse lg:flex-row bg-primary/10 shadow-xl relative transition-all"
            style={{ borderRadius: 40 }}
          >
            <div className="lg:w-3/5 flex flex-col justify-end">
              <AnimatePresence>
                <h4 className="font-inter leading-snug font-medium text-2xl lg:text-4xl mt-8 lg:mt-0 mb-6">{current.quote}</h4>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-inter font-semibold text-4xl text-primary">{current.nama}</p>
                  </div>
                  <div className="flex">
                    <button onClick={(e) => handlePrev()} disabled={min ? true : false}>
                      <ArrowLeft2 size={32} className={min ? "text-gray-900/20 cursor-pointer" : "text-primary cursor-pointer"} />
                    </button>
                    <button onClick={(e) => handleNext()} disabled={max ? true : false}>
                      <ArrowRight2 size={32} className={max ? "text-gray-900/20 cursor-pointer" : "text-primary cursor-pointer"} />
                    </button>
                  </div>
                </div>
                <p className="text-inter font-medium text-2xl text-black/60">{current.jabatan}</p>
                <p className="text-inter font-medium text-2xl text-black/60">at {current.tempat}</p>
              </AnimatePresence>
            </div>
            <div className="lg:w-2/5">
              <img src={`/${current.photo}`} className="lg:absolute static bottom-0 right-28" style={{ width: 300 }} alt="" />
            </div>
          </div>

          {/* For Mobile */}
          <div {...swipeHandlers} style={{ height: "60vh" }} className="lg:hidden block w-full relative">
            {testimoni.map((item, idx) => (
              <motion.div
                animate={{ left: `${(idx - position) * 78}vw`, scale: idx === position ? 1 : 0.9 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, mass: 2 }}
                style={{ height: "60vh", width: "75vw" }}
                className="absolute flex flex-col justify-evenly w-64 lg:hidden px-4 mx-4 rounded-xl lg:mx-0 py-4 bg-primary/10 shadow-xl transition-all"
              >
                <img src={`/${item.photo}`} className="absolute left-1/2 transform -translate-x-1/2 -top-28" style={{ width: item.width }} alt="" />
                <h4 className="font-inter text-center leading-snug font-medium text-xl lg:text-4xl mt-36 mb-6">{item.quote}</h4>
                <p className="font-inter font-semibold text-3xl text-primary">{item.nama}</p>
                <p className="text-inter font-medium text-xl text-black/60">
                  {item.jabatan}at {item.tempat}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

Home.layout = LandingPage;
