import React from "react";

function FiturRow({ title, path, Icon, optionalIcon, subMenu = false }) {
  return (
    <div className="flex w-full items-center text-black duration-75 text-opacity-30 hover:text-primary cursor-pointer group">
      <div className="w-1/6">{Icon}</div>
      <div className="w-5/6 flex items-center justify-between">
        <p
          className={`hidden md:inline-flex   group-hover:text-twitter ${
            subMenu ? "text-xs" : "lg:text-base"
          }`}
        >
          {title}
        </p>
        {optionalIcon}
      </div>
    </div>
  );
}

export default FiturRow;
