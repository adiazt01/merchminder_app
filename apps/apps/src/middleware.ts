import { auth } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export default auth((req: NextRequest) => {
  if (!req.auth) {
    return NextResponse.redirect(
      new URL("/api/auth/signin", req.nextUrl).toString()
    );
  }
});

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
