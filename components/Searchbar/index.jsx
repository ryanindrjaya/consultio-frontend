import React from "react";

import { SearchNormal1, NotificationBing } from "iconsax-react";
import { useState } from "react";

function Searchbar() {
  const [showUserOption, setShowUserOption] = useState(false);

  return (
    <div className="bg-white sticky top-0 pt-1 z-30">
      <div className="w-full px-5 flex justify-center mt-1 items-center border-b pb-2">
        <div className="flex w-3/5 items-center space-x-4 border rounded-lg px-5 py-2 ">
          <SearchNormal1 size={16} className="text-black text-opacity-30" />
          <input type="text" placeholder="Search..." className="flex-1 outline-none bg-transparent" />
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
