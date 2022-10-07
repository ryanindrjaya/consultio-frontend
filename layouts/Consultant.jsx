import React from "react";

// components
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";

export default function ConsultantLayout({ children }) {
  return (
    <div className="grid grid-cols-12 lg:grid-cols-9">
      <Navbar />
      <div className="col-span-10 lg:col-span-7">
        <div className="max-h-screen relative overflow-y-scroll scrollbar-hide">
          <Searchbar />
          {children}
        </div>
      </div>
    </div>
  );
}
