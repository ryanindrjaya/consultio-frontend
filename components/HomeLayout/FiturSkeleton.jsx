import React, { useState } from "react";

function Fitur() {
  return (
    <div className="flex flex-col w-full items-center md:items-start">
      <div className="py-5">
        <div className="w-12 h-3 bg-gray-200 rounded-xl"></div>
      </div>
      <div className={`w-full space-y-6`}>
        {/* wrapper */}
        <div className={`flex w-full text-center items-center`}>
          <div className="w-1/6">
            <div className="w-6 h-6 rounded-full bg-gray-200 flex justify-center lg:justify-start"></div>
          </div>
          <div className="lg:flex w-5/6 items-center justify-between">
            <p className={`hidden md:inline-flex w-20 h-5 bg-gray-200 rounded-xl`}></p>
          </div>
        </div>
        {/* wrapper */}

        {/* wrapper */}
        <div className={`flex w-full text-center items-center`}>
          <div className="w-1/6">
            <div className="w-6 h-6 rounded-full bg-gray-200 flex justify-center lg:justify-start"></div>
          </div>
          <div className="lg:flex w-5/6 items-center justify-between">
            <p className={`hidden md:inline-flex w-28 h-5 bg-gray-200 rounded-xl`}></p>
          </div>
        </div>
        {/* wrapper */}

        {/* wrapper */}
        <div className={`flex w-full text-center items-center`}>
          <div className="w-1/6">
            <div className="w-6 h-6 rounded-full bg-gray-200 flex justify-center lg:justify-start"></div>
          </div>
          <div className="lg:flex w-5/6 items-center justify-between">
            <p className={`hidden md:inline-flex w-24 h-5 bg-gray-200 rounded-xl`}></p>
          </div>
        </div>
        {/* wrapper */}

        {/* wrapper */}
        <div className={`flex w-full text-center items-center`}>
          <div className="w-1/6">
            <div className="w-6 h-6 rounded-full bg-gray-200 flex justify-center lg:justify-start"></div>
          </div>
          <div className="lg:flex w-5/6 items-center justify-between">
            <p className={`hidden md:inline-flex w-16 h-5 bg-gray-200 rounded-xl`}></p>
          </div>
        </div>
        {/* wrapper */}

        {/* wrapper */}
        <div className={`flex w-full text-center items-center`}>
          <div className="w-1/6">
            <div className="w-6 h-6 rounded-full bg-gray-200 flex justify-center lg:justify-start"></div>
          </div>
          <div className="lg:flex w-5/6 items-center justify-between">
            <p className={`hidden md:inline-flex w-16 h-5 bg-gray-200 rounded-xl`}></p>
          </div>
        </div>
        {/* wrapper */}
      </div>
    </div>
  );
}

export default Fitur;
