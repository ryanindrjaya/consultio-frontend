import React from "react";

// components
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function HistoryLayout({ children }) {
  return (
    <motion.div
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
      className="grid grid-cols-9"
    >
      <Navbar />
      <div className="col-span-7">
        <div className="max-h-screen relative overflow-y-scroll scrollbar-hide">
          <div className="bg-white sticky top-0 pt-1 z-30">
            <div className="w-full px-5 flex justify-center mt-1 items-center border-b pb-2">
              <div className="flex lg:w-3/5 items-center justify-center space-x-4 rounded-lg px-5 py-2 ">
                <h1 className="font-poppins font-medium text-xl">Riwayat Konsultasi</h1>
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </motion.div>
  );
}
