import React from "react";

import NavbarAuth from "../components/Navbar/NavbarAuth";
import { motion } from "framer-motion";

function Auth({ children }) {
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
      <section className="h-full flex justify-center items-center mx-auto lg:max-w-md">
        <div className="flex-1">{children}</div>
      </section>
    </motion.main>
  );
}

export default Auth;
