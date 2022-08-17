import React from "react";

function Auth({ children }) {
  return (
    <main>
      <section className="relative w-full h-full min-h-screen">
        {children}
      </section>
    </main>
  );
}

export default Auth;
