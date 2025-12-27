import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  let userId = req.cookies.get("user_id")?.value;

  if (!userId) {
    userId = crypto.randomUUID();

    res.cookies.set("user_id", userId, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  return res;
}
