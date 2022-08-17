import { NextResponse } from "next/server";

export function middleware(req) {
  const response = new NextResponse();
  const url = req.nextUrl.clone();
  const { value, options } = req.cookies.getWithOptions("token");
  const role = req.cookies.get("role");

  // USER MIDDLEWARE
  // if (req.nextUrl.pathname.startsWith("/home")) {
  //   url.pathname = "/auth/login";
  //   if (!value) {
  //     return NextResponse.redirect(url.href);
  //   } else {
  //     if (role.includes("user") || role.includes("USER")) {
  //       url.pathname = "/home";
  //       return NextResponse.redirect(url.href);
  //     }
  //   }
  // }

  // DEFAULT MIDDLEWARE
  if (req.nextUrl.pathname.startsWith("/auth/login")) {
    const { value, options } = req.cookies.getWithOptions("role");
    // admin
    const urlUser = req.nextUrl.clone();
    urlUser.pathname = "/home";

    if (role) {
      if (role.includes("User") || role.includes("USER")) {
        return NextResponse.redirect(urlUser.href);
      }
    }
  }
}
