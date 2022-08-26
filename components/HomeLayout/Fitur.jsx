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

function Fitur() {
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  return (
    <div className="flex flex-col w-full items-center md:items-start">
      <h2 className="py-5 font-inter text-black text-opacity-30 font-medium text-sm">
        Menu
      </h2>
      <div className={`w-full ${showMoreMenu ? "space-y-3" : "space-y-6"}`}>
        <FiturRow
          title={"Timeline"}
          Icon={<Element variant="Bold" size={24} />}
        />
        <div
          className="transition-all"
          onClick={() => setShowMoreMenu(!showMoreMenu)}
        >
          <FiturRow
            title={"Konsultasi"}
            Icon={<DocumentText variant="Bold" size={24} />}
            optionalIcon={<ArrowDown2 variant="Bold" size={16} />}
          />
          <div
            className={`ml-10 mt-4 flex flex-col gap-y-4 ${
              showMoreMenu ? "inline" : "hidden"
            }`}
          >
            <FiturRow
              title={"Kesehatan Mental"}
              Icon={<Lovely variant="Bold" size={24} />}
              subMenu={true}
            />
            <FiturRow
              title={"Bantuan Hukum"}
              Icon={<Judge variant="Bold" size={24} />}
              subMenu={true}
            />
          </div>
        </div>
        <FiturRow
          title={"Message"}
          Icon={<Message variant="Bold" size={24} />}
        />
        <FiturRow
          title={"History"}
          Icon={<EmptyWallet variant="Bold" size={24} />}
        />
        <FiturRow
          title={"Setting"}
          Icon={<Setting2 variant="Bold" size={24} />}
        />
      </div>
    </div>
  );
}

export default Fitur;
