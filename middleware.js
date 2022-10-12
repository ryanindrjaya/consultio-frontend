import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get("token");
  const twoFirstPath = url.pathname.split("/", 3).join("/");

  const whiteListPath = [
    "/",
    "/auth/login",
    "/auth/register",
    "/auth/verification",
    "/chats",
    "/consultant/mental-health",
    "/consultant/lawyer",
    "/history",
    "/history/booking",
    "/home",
    "/profile",
    "/verify",
  ];

  const authenticatedPath = [
    "/auth/verification",
    "/chats",
    "/consultant/mental-health",
    "/consultant/lawyer",
    "/history",
    "/history/booking",
    "/home",
    "/profile",
    "/verify",
  ];

  if (whiteListPath.includes(twoFirstPath)) {
    const isAuthenticatedPage = authenticatedPath.includes(twoFirstPath);

    if (isAuthenticatedPage) {
      if (!token) {
        url.pathname = "/auth/login";
        return NextResponse.redirect(url.href);
      }
    }

    if (!isAuthenticatedPage && url.pathname !== "/") {
      if (token) {
        url.pathname = "/home";
        return NextResponse.redirect(url.href);
      }
    }
  }
}
