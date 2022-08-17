import React from "react";

// components
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Home({ children }) {
  return (
    <>
      <div className="lg:max-w-6xl mx-auto max-h-screen overflow-hidden md:ml-64 bg-blueGray-100">
        <Navbar />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
}
