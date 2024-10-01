import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const config = { matcher: "/((?!.*\\.).*)" };

export default async function middleware(req) {
  const { pathname } = req.nextUrl;

  const url = req.nextUrl.clone();
  const noAuth = [
    "/",
    "/register",
    "/forgot-password",
    "/activate-account",
    "/reset-password-account",
    "/verify-multi-factor-auth",
  ];
  const auth = [
    "/dashboard/home",
    "/dashboard",
    "/dashboard/qr",
    "/notifications",
    "/organisations",
    "/profile",
    "/qr",
    "/settings",
    "/staff-management",
    "/transactions",
    "/users",
  ];
  const loggedIn = !!req.cookies.has("sanitrack-auth-token");

  let role = req.cookies.get("san-role");

  // if (!loggedIn && !noAuth.includes(pathname)) {
  //   return NextResponse.redirect(new URL("/", req.url));
  // } else if (loggedIn && !noAuth.includes(pathname)) {
  //   return;
  // }
  if (loggedIn && noAuth.includes(pathname)) {
    if (role?.value === "Admin") {
      return NextResponse.redirect(new URL("/dashboard/mss", req.url));
    }
    if (role?.value === "Manager") {
      return NextResponse.redirect(new URL("/dashboard/home", req.url));
    }
    if (role?.value === "Cleaner" ) {
      return NextResponse.redirect(
        new URL("/dashboard/cleaner/work-order", req.url)
      );
    } else if (role?.value === "Inspector") {
      return NextResponse.redirect(
        new URL("/dashboard/inspector/work-order", req.url)
      );
    }
  }
  if (!loggedIn && auth.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}
