import React from "react";

import NavbarAuth from "../components/Navbar/NavbarAuth";

function Auth({ children }) {
  return (
    <main className="h-auto w-full">
      <NavbarAuth />
      <section className="h-screen flex justify-center items-center mx-auto lg:max-w-md">
        <div className="flex-1">{children}</div>
      </section>
    </main>
  );
}

export default Auth;
