import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import nookies from "nookies";

import Fitur from "../HomeLayout/Fitur";

import { Logout, Login } from "iconsax-react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

function NavbarSkeleton() {
  const [profileOption, setProfileOption] = useState(false);
  const [showUserOption, setShowUserOption] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const router = useRouter();

  async function fetchData() {
    const cookies = nookies.get(null);
    const user = JSON.parse(cookies.user);

    const endpoint = process.env.API_URL + "/users/" + user.userId;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: cookies.token,
      },
    };

    try {
      const req = await fetch(endpoint, config);
      const res = await req.json();

      if (req.status === 200) {
        setUserInfo(res.data.profile);
      } else {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleLogout() {
    nookies.destroy(null, "token", {
      path: "/",
    });
    nookies.destroy(null, "role", {
      path: "/",
    });
    nookies.destroy(null, "user", {
      path: "/",
    });

    router.replace("/auth/login");
  }

  return (
    <div className="col-span-2 h-screen border-x flex flex-col justify-between max-h-screen p-3 lg:p-7 overflow-y-hidden scrollbar-hide">
      <div className="max-w-full">
        <div className="flex justify-center">
          <Link href={"/"}>
            <img src="/consultio.svg" className="text-center cursor-pointer" alt="logo consultio" />
          </Link>
        </div>

        <Fitur />
      </div>

      {/* User profile */}
      <div>
        {userInfo && <p className="text-sm text-center lg:text-left font-medium mb-5 text-black text-opacity-30">Profile</p>}
        <div className={`h-32 flex flex-col ${userInfo ? "justify-around lg:justify-between" : "justify-end"}`}>
          {userInfo && (
            <div className="flex justify-center lg:justify-between items-center h-12">
              <div className="flex justify-between">
                <img
                  onClick={() => setShowUserOption(!showUserOption)}
                  className="h-12 cursor-pointer relative w-12 object-cover rounded-full"
                  src={`http://203.6.149.156:8480/public/${userInfo.photo}` || "https://links.papareact.com/gll"}
                  alt=""
                />
                <div className="h-full hidden ml-4 lg:flex flex-col justify-between">
                  <p className="font-medium text-base">{userInfo?.fullname}</p>
                  <p className="font-normal text-sm">{userInfo?.role}</p>
                </div>
              </div>
              <div onClick={() => setShowUserOption(!showUserOption)} className="relative">
                <MoreHorizIcon className="sm:hidden lg:block cursor-pointer" />
                {showUserOption && (
                  <Link href={"/profile"}>
                    <div
                      className="w-40 h-10 bg-white rounded-tl-lg rounded-br-lg rounded-bl-lg border absolute right-3 top-5 z-10"
                      style={{ borderColor: "black" }}
                    >
                      <div
                        className="h-full cursor-pointer rounded-tl-lg rounded-br-lg rounded-bl-lg px-5 py-3 duration-75 hover:bg-black/10 flex items-center"
                        style={{ borderColor: "black" }}
                      >
                        <p>Ubah Profile</p>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          )}
          {userInfo ? (
            <div
              onClick={handleLogout}
              className="lg:w-full py-2 mx-2 lg:max-0 lg:px-5 lg:py-3 cursor-pointer rounded-lg duration-150 text-white bg-blue-500 hover:bg-blue-600 flex justify-center items-center"
            >
              <Logout size={24} variant={"Bold"} className="text-white" />
              <p className="font-normal hidden lg:block text-base font-inter ml-4">Logout</p>
            </div>
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

export default NavbarSkeleton;
