import Link from "next/link";
import React from "react";

function NavbarAuth() {
  return (
    <div className="h-16 border-b-2 flex justify-center items-center">
      <Link href={"/"}>
        <img
          className="cursor-pointer"
          src="/consultio.svg"
          alt="logo consultio"
        />
      </Link>
    </div>
  );
}

export default NavbarAuth;
