import React from "react";

import FooterLandingPage from "../components/Footer/FooterLandingPage";
import NavbarLandingPage from "../components/Navbar/NavbarLandingPage";
import { motion } from "framer-motion";

function LandingPage({ children }) {
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
    >
      <div className="relative lg:max-w-6xl mx-auto">
        <NavbarLandingPage />

        <div>{children}</div>

        <FooterLandingPage />
      </div>
      <div className="w-full flex justify-center py-3 text-white" style={{ backgroundColor: "#A6A8AD" }}>
        <p>Powered by Consultio</p>
      </div>
    </motion.div>
  );
}

export default LandingPage;
