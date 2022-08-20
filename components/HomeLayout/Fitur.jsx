import React from "react";
import FiturRow from "./FiturRow";

// Icons
import {
  DocumentText,
  Element,
  EmptyWallet,
  Message,
  Setting2,
  ArrowDown2,
} from "iconsax-react";

function Fitur() {
  return (
    <div className="flex flex-col w-full items-center md:items-start">
      <h2 className="py-5 font-inter text-black text-opacity-30 font-medium text-sm">
        Menu
      </h2>
      <div className="w-full space-y-6">
        <FiturRow
          title={"Timeline"}
          Icon={
            <Element
              className="text-black text-opacity-30"
              variant="Bold"
              size={24}
            />
          }
        />
        <FiturRow
          title={"Konsultasi"}
          Icon={
            <DocumentText
              className="text-black text-opacity-30"
              variant="Bold"
              size={24}
            />
          }
          optionalIcon={
            <ArrowDown2
              className="text-black text-opacity-50"
              variant="Bold"
              size={16}
            />
          }
        />
        <FiturRow
          title={"Message"}
          Icon={
            <Message
              className="text-black text-opacity-30"
              variant="Bold"
              size={24}
            />
          }
        />
        <FiturRow
          title={"History"}
          Icon={
            <EmptyWallet
              className="text-black text-opacity-30"
              variant="Bold"
              size={24}
            />
          }
        />
        <FiturRow
          title={"Setting"}
          Icon={
            <Setting2
              className="text-black text-opacity-30"
              variant="Bold"
              size={24}
            />
          }
        />
      </div>
    </div>
  );
}

export default Fitur;
