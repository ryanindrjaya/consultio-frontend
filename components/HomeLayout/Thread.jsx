import { CloseCircle, Heart, Message } from "iconsax-react";
import React, { useState } from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import nookies from "nookies";

function Thread() {
  const cookies = nookies.get(null);
  const userInfo = JSON.parse(cookies.user);

  const [liked, setLiked] = useState(false);

  return (
    <div className="w-2/5 h-screen sticky top-14 px-2 hidden lg:inline">
      <div className="mt-5 mb-12 border-t h-full rounded-lg shadow-lg px-7 py-3">
        <div className="pb-4 border-b mb-3">
          <div className="flex gap-x-3 mb-5">
            <img
              src="https://img.celebrities.id/okz/900/I52Dz3/master_x12dr76sp6_556.jpg"
              className="h-12 w-12 object-cover rounded-lg"
              alt=""
            />

            <div className="w-full flex justify-between items-center">
              <div className="flex flex-col justify-between h-12">
                <h3 className="font-inter font-medium text-lg">Barry Allen</h3>
                <p className="font-inter text-sm" style={{ color: "#023047" }}>
                  25 Minutes ago
                </p>
              </div>
              <div className="cursor-pointer">
                <CloseCircle
                  fontSize="medium"
                  style={{ color: "black", opacity: 0.5 }}
                />
              </div>
            </div>
          </div>

          <img
            src="https://irs.www.warnerbros.com/hero-banner-v2-mobile-jpeg/movies/media/browser/justice_league_uber2b_032417_4320x1080.jpg"
            className="max-h-96 w-full mb-5 object-cover rounded-xl"
            alt=""
          />

          <p className="font-normal text-base">
            Cah cah ku lagi on action masszeee
          </p>
        </div>
        <div className="w-full">
          <div className="w-full flex gap justify-between">
            <div
              onClick={() => setLiked(!liked)}
              className="w-2/5 justify-around cursor-pointer flex rounded-3xl bg-gray-100 px-3 py-2"
            >
              <p>53</p>

              {liked ? (
                <Heart
                  size={24}
                  color="#F24949"
                  className="animate-wiggle"
                  variant="Bold"
                />
              ) : (
                <Heart size={24} color="#F24949" />
              )}
            </div>
            <div
              onClick={() => setLiked(!liked)}
              className="w-2/5 justify-around cursor-pointer flex rounded-3xl bg-gray-100 px-3 py-2"
            >
              <p>5</p>

              <Message color="#437EEB" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Thread;
