import React from "react";
import SearchIcon from "@mui/icons-material/Search";

function Navbar() {
  return (
    <div>
      <span className="bg-gray-400 w-fit text-left text-white px-14 py-2">
        logo
      </span>

      {/* searchbar */}
      <div className="flex items-center space-x-2 bg-gray-100 p-3 rounded-full mt-2">
        <SearchIcon className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 outline-none bg-transparent"
        />
      </div>

      {/* profile icon */}
    </div>
  );
}

export default Navbar;
