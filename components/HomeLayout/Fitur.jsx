import React, { useState } from "react";
import FiturRow from "./FiturRow";

// Icons
import {
  DocumentText,
  Element,
  EmptyWallet,
  Message,
  Setting2,
  ArrowDown2,
  Lovely,
  Judge,
} from "iconsax-react";
import { useRouter } from "next/router";

function Fitur() {
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const router = useRouter();

  return (
    <div className="flex flex-col w-full items-center md:items-start">
      <h2 className="py-5 font-inter text-black text-opacity-30 font-medium text-sm">
        Menu
      </h2>
      <div className={`w-full space-y-6`}>
        <FiturRow
          title={"Timeline"}
          path="/home"
          Icon={<Element variant="Bold" size={24} />}
        />
        <div
          onClick={() => setShowMoreMenu(!showMoreMenu)}
        >
          <div
            className={`flex w-full items-center ${
              router.pathname.indexOf("/consultant") !== -1
                ? "text-primary"
                : "text-black text-opacity-30"
            }  duration-75 hover:text-primary cursor-pointer group`}
          >
            <div className="w-1/6">
              <DocumentText variant="Bold" size={24} />
            </div>
            <div className="w-5/6 flex items-center justify-between">
              <p
                className={`hidden md:inline-flex   group-hover:text-twitter lg:text-base"
                }`}
              >
                Konsultasi
              </p>
              <ArrowDown2 variant="Bold" size={16} />
            </div>
          </div>
          {showMoreMenu ? (
          <div
            className={`ml-10 transition-all pt-5 flex flex-col gap-y-4`}
          >
            <FiturRow
              path="/consultant/mental-health"
              title={"Kesehatan Mental"}
              Icon={<Lovely variant="Bold" size={24} />}
              subMenu={true}
            />
            <FiturRow
              path="/consultant/lawyer"
              title={"Bantuan Hukum"}
              Icon={<Judge variant="Bold" size={24} />}
              subMenu={true}
            />
          </div>
          ) : (<div className="transition-all"></div>)}
        </div>
        <FiturRow
          path="/chats"
          title={"Pesan"}
          Icon={<Message variant="Bold" size={24} />}
        />
        <FiturRow
          path="/history"
          title={"History"}
          Icon={<EmptyWallet variant="Bold" size={24} />}
        />
        <FiturRow
          path="#"
          title={"Setting"}
          Icon={<Setting2 variant="Bold" size={24} />}
        />
      </div>
    </div>
  );
}

export default Fitur;
