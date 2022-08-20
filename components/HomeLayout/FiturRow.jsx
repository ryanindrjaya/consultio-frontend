import React from "react";

function FiturRow({ title, path, Icon, optionalIcon }) {
  return (
    <div className="flex w-full items-center  cursor-pointer group">
      <div className="w-1/6">{Icon}</div>
      <div className="w-5/6 flex items-center justify-between">
        <p className="hidden md:inline-flex text-black text-opacity-30 group-hover:text-twitter text-based lg:text-base">
          {title}
        </p>
        {optionalIcon}
      </div>
    </div>
  );
}

export default FiturRow;
