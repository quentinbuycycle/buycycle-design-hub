import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  const { password } = await request.json();

  const uploadPassword = process.env.UPLOAD_PASSWORD;
  if (!uploadPassword || password !== uploadPassword) {
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }

  const token = crypto
    .createHmac("sha256", uploadPassword)
    .update("buycycle-hub-auth")
    .digest("hex");

  const response = NextResponse.json({ success: true });
  response.cookies.set("hub-auth", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return response;
}
