import React from "react";

// components
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import { motion } from "framer-motion";

export default function ProfileLayout({ children }) {
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
      className="grid grid-cols-9"
    >
      <Navbar />
      <div className="col-span-7">
        <div className="max-h-screen pt-10 relative overflow-y-scroll scrollbar-hide">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
