import Link from "next/link";
import React from "react";

function NavbarLandingPage() {
  return (
    <div className="py-7 absolute left-0 right-0 top-0 flex justify-between">
      <Link href={"/"}>
        <img
          className="cursor-pointer object-contain"
          src="/consultio.svg"
          alt="logo consultio"
        />
      </Link>
      <Link href={"/auth/login"}>
        <button className="w-28 rounded-lg bg-primary text-white h-10">
          Login
        </button>
      </Link>
    </div>
  );
}

export default NavbarLandingPage;
