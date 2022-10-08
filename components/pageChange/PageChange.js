import React from "react";

// components
import NavbarSkeleton from "../Navbar/NavbarSkeleton";
import Searchbar from "../Searchbar/Skeleton";
import Lottie from "lottie-react";
import Loading from "../../public/lottie/skeleton.json";

export default function PageChange() {
  return (
    <div className="grid grid-cols-9 ">
      <NavbarSkeleton />
      <div className="col-span-7 relative">
        <div className="max-h-screen overflow-hidden scrollbar-hide">
          <Searchbar />
          {/* centered element */}
          <div className="absolute w-full h-full top-1/2 left-1/2 flex justify-center items-center transform -translate-x-1/2 -translate-y-1/2">
            <Lottie animationData={Loading} className="w-full h-2/5" loop={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
