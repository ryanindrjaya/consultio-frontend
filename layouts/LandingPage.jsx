import React from "react";

import FooterLandingPage from "../components/Footer/FooterLandingPage";
import NavbarLandingPage from "../components/Navbar/NavbarLandingPage";

function LandingPage({ children }) {
  return (
    <>
      <div className="relative lg:max-w-6xl mx-auto">
        <NavbarLandingPage />

        <div>{children}</div>

        <FooterLandingPage />
      </div>
      <div
        className="w-full flex justify-center py-3 text-white"
        style={{ backgroundColor: "#A6A8AD" }}
      >
        <p>Powered by Consultio</p>
      </div>
    </>
  );
}

export default LandingPage;
