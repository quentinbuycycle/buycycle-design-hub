import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";
import { generateShareToken } from "@/lib/share";

export async function POST(request: Request) {
  try {
    // Auth check — must be logged in to generate share links
    const uploadPassword = process.env.UPLOAD_PASSWORD;
    if (!uploadPassword) {
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    const cookieStore = await cookies();
    const authCookie = cookieStore.get("hub-auth");
    const expectedToken = crypto
      .createHmac("sha256", uploadPassword)
      .update("buycycle-hub-auth")
      .digest("hex");

    if (authCookie?.value !== expectedToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug, prototypes } = await request.json();

    if (!slug || !Array.isArray(prototypes) || prototypes.length === 0) {
      return NextResponse.json(
        { error: "slug and at least one prototype are required" },
        { status: 400 }
      );
    }

    const token = generateShareToken(slug, prototypes);

    return NextResponse.json({ token });
  } catch (error) {
    console.error("Share error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
