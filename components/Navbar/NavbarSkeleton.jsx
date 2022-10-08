import React from "react";
import Link from "next/link";

import FiturSkeleton from "../HomeLayout/FiturSkeleton";

function NavbarSkeleton() {
  return (
    <div className="col-span-2 h-screen border-x flex animate-pulse flex-col justify-between max-h-screen p-3 lg:p-7 overflow-y-hidden scrollbar-hide">
      <div className="max-w-full">
        <div className="flex justify-center">
          <div className="w-32 h-5 bg-gray-200 rounded-xl"></div>
        </div>

        <FiturSkeleton />
      </div>

      {/* User profile */}
      <div>
        <div className="py-5">
          <div className="w-12 h-3 bg-gray-200 rounded-xl"></div>
        </div>
        <div className={`h-32 flex flex-col justify-between`}>
          <div className="flex justify-center lg:justify-between items-center h-12">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full bg-gray-200"></div>
              <div className="h-full hidden ml-4 lg:flex flex-col justify-between">
                <div className="w-32 h-5 mb-1 rounded-xl bg-gray-200"></div>
                <div className="w-10 h-5 rounded-xl bg-gray-200"></div>
              </div>
            </div>
          </div>
          <div className="lg:w-full py-2 mx-2 lg:max-0 lg:px-5 lg:py-3 cursor-pointer rounded-lg duration-150 text-white bg-gray-200 flex justify-center items-end">
            <p className="font-normal hidden lg:block text-base text-gray-200 font-inter ml-4">Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarSkeleton;
