import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const prototypesDir = path.join(process.cwd(), "content/output/prototypes");

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;

  // Sanitize: only allow .html files, no path traversal
  if (!filename.endsWith(".html") || filename.includes("..") || filename.includes("/")) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const filePath = path.join(prototypesDir, filename);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const html = fs.readFileSync(filePath, "utf8");

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
