import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
const { clerkClient } = await import("@clerk/nextjs/server");

export default clerkMiddleware((auth, request, event) => {});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
