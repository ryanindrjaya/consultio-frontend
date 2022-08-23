import React from "react";

import FooterLandingPage from "../components/Footer/FooterLandingPage";
import NavbarLandingPage from "../components/Navbar/NavbarLandingPage";

function LandingPage({ children }) {
  return (
    <div className="px-3 lg:px-12">
      <NavbarLandingPage />

      {children}

      <FooterLandingPage />
    </div>
  );
}

export default LandingPage;
