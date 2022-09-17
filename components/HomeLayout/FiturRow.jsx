import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function FiturRow({ title, path, Icon, optionalIcon, subMenu = false }) {
  const router = useRouter();
  return (
    <Link href={path}>
      <div
        className={`flex w-full items-center ${
          router.pathname.indexOf(path) !== -1
            ? "text-primary"
            : "text-black text-opacity-30"
        } duration-75 hover:text-primary cursor-pointer group`}
      >
        <div className="w-1/6">{Icon}</div>
        <div className="w-5/6 flex items-center justify-between">
          <p
            className={`hidden md:inline-flex   group-hover:text-twitter ${
              subMenu ? "text-md" : "lg:text-base"
            }`}
          >
            {title}
          </p>
          {optionalIcon}
        </div>
      </div>
    </Link>
  );
}

export default FiturRow;
