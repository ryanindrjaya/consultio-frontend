import React from "react";

// components
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function Chat({ children }) {
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
        <div className="max-h-screen relative overflow-hidden scrollbar-hide">{children}</div>
      </div>
    </motion.div>
  );
}
