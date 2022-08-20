import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";

import Fitur from "../HomeLayout/Fitur";

import { logout } from "../../features/user/userSlice";

import { Button } from "@mui/material";
import { Logout, Login } from "iconsax-react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

function Navbar() {
  const { userInfo, userToken } = useSelector((state) => state.user);
  const [profileOption, setProfileOption] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter;

  return (
    <div className="col-span-2 border-x flex flex-col justify-between h-screen max-h-screen p-7">
      <div>
        <p className="bg-gray-400 w-full py-4 text-center text-white">logo</p>

        <Fitur />
      </div>

      {/* User profile */}
      <div>
        <p className="text-sm font-medium mb-5 text-black text-opacity-30">
          Profile
        </p>
        <div className="h-32 flex flex-col justify-between">
          {userToken && (
            <div className="flex justify-between items-center h-12">
              <div className="flex justify-between">
                <img
                  onClick={() => setProfileOption(!profileOption)}
                  className="h-12 cursor-pointer relative w-12 object-cover rounded-full"
                  src={userInfo.profile.photo}
                  alt=""
                />
                <div className="h-full ml-4 flex flex-col justify-between">
                  <p className="font-medium text-base">
                    {userInfo.profile.fullname}
                  </p>
                  <p className="font-normal text-sm">User Account</p>
                </div>
              </div>
              <MoreHorizIcon className="cursor-pointer" />
            </div>
          )}
          {userToken ? (
            <Link href={"/home"} onClick={() => dispatch(logout())}>
              <div className="w-full px-5 py-3 cursor-pointer rounded-lg duration-150 text-white bg-blue-500 hover:bg-blue-600 flex items-center">
                <Logout size={24} variant={"Bold"} className="text-white" />
                <p className="font-normal text-base font-inter ml-4">Logout</p>
              </div>
            </Link>
          ) : (
            <Link href={"/auth/login"}>
              <div className="w-full px-5 py-3 cursor-pointer rounded-lg duration-150 text-white bg-blue-500 hover:bg-blue-600 flex items-center">
                <Login size={24} variant={"Bold"} className="text-white" />
                <p className="font-normal text-base font-inter ml-4">Login</p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
