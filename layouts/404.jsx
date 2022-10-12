import React from "react";
import { motion } from "framer-motion";
import NavbarAuth from "../components/Navbar/NavbarAuth";

export default function Custom404({ children }) {
  return (
    <motion.main
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
      className="h-screen w-full overflow-hidden"
    >
      <NavbarAuth />
      <div className="flex-1">{children}</div>
    </motion.main>
  );
}
