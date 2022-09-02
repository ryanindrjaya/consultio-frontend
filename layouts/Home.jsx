import React from "react";

// components
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";

export default function Home({ children }) {
  return (
    <div className="grid grid-cols-9">
      <Navbar />
      <div className="col-span-7">
        <div className="h-full relative overflow-scroll scrollbar-hide">
          <Searchbar />
          {children}
        </div>
      </div>
    </div>
  );
}
