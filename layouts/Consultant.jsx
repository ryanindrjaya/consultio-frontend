import React from "react";

// components
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import { motion } from "framer-motion";

export default function ConsultantLayout({ children }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {
          opacity: 0
        },
        visible: {
          opacity: 1,
          transition: {
            delay: 0.1
          }
        }
      }}
      className="grid grid-cols-12 lg:grid-cols-9"
    >
      <Navbar />
      <div className="col-span-10 lg:col-span-7">
        <div className="max-h-screen relative overflow-y-scroll scrollbar-hide">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
