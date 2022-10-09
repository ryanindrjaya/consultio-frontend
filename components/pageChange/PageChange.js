import React from "react";
import { motion } from "framer-motion";
// components
import NavbarSkeleton from "../Navbar/NavbarSkeleton";
import Searchbar from "../Searchbar/Skeleton";
import Lottie from "lottie-react";
import Loading from "../../public/lottie/skeleton.json";
import Head from "next/head";

export default function PageChange() {
  return (
    <>
      <Head>
        <title>Loading...</title>
      </Head>
      <motion.div
        className="grid grid-cols-9"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {
            opacity: 0,
          },
          visible: {
            opacity: 1,
            transition: {
              delay: 0.1,
            },
          },
        }}
      >
        <NavbarSkeleton />
        <div className="col-span-7 relative">
          <div className="max-h-screen overflow-hidden scrollbar-hide">
            <Searchbar />
            {/* centered element */}
            <div className="absolute w-full h-full top-1/2 left-1/2 flex justify-center items-center transform -translate-x-1/2 -translate-y-1/2">
              <Lottie animationData={Loading} className="w-full h-2/5" loop={true} />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
