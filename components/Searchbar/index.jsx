import React from "react";

import { SearchNormal1, NotificationBing } from "iconsax-react";

function Searchbar() {
  return (
    <div className="w-full flex justify-between mt-9 items-center border-b pb-5">
      <div className="flex w-1/2 items-center space-x-4 border rounded-lg px-5 py-3 ">
        <SearchNormal1 size={24} className="text-black text-opacity-30" />
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 outline-none bg-transparent"
        />
      </div>
      <div className="rounded-lg border p-1">
        <NotificationBing size={24} className=" text-black text-opacity-50 " />
      </div>
    </div>
  );
}

export default Searchbar;
