import { auth } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

// @ts-ignore
export default auth((req: NextRequest) => {
  // @ts-ignore
  if (!req.auth) {
    return NextResponse.redirect(
      new URL("/auth/login", req.nextUrl).toString()
    );
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
