import React from "react";

import { SearchNormal1, NotificationBing } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/user/userSlice";
import { useState } from "react";

function Searchbar() {
  const { userInfo } = useSelector((state) => state.user);
  const [showUserOption, setShowUserOption] = useState(false);

  const dispatch = useDispatch();

  return (
    <div className="bg-white sticky top-0 pt-1 z-50">
      <div className="w-full px-5  flex justify-between mt-1 items-center border-b pb-2">
        <div className="flex w-1/2 items-center space-x-4 border rounded-lg px-5 py-2 ">
          <SearchNormal1 size={16} className="text-black text-opacity-30" />
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 outline-none bg-transparent"
          />
        </div>
        <div className="rounded-lg relative">
          <img
            onClick={() => setShowUserOption(!showUserOption)}
            src={userInfo?.profile?.photo || "https://links.papareact.com/gll"}
            className="h-9 cursor-pointer z-20 relative w-9 object-cover rounded-lg"
            alt=""
          />
          {showUserOption && (
            <div
              className="w-64 h-28 bg-white rounded-lg border absolute right-0 top-6 z-10"
              style={{ borderColor: "black" }}
            >
              <div
                className="h-1/2 cursor-pointer rounded-tl-lg rounded-tr-lg px-5 py-3 duration-75 hover:bg-black/10 border-b flex items-center"
                style={{ borderColor: "black" }}
              >
                <p>Ubah Profile</p>
              </div>
              <div
                onClick={() => dispatch(logout())}
                className="h-1/2 cursor-pointer rounded-bl-lg rounded-br-lg duration-75 hover:bg-black/10 px-5 py-3 flex font-bold text-red-600 items-center"
              >
                <p>Logout</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Searchbar;
