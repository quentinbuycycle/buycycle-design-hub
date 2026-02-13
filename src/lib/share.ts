import crypto from "crypto";

interface SharePayload {
  /** case study slug */
  s: string;
  /** prototype filenames to share */
  p: string[];
}

function getSecret(): string {
  const secret = process.env.UPLOAD_PASSWORD;
  if (!secret) throw new Error("UPLOAD_PASSWORD not configured");
  return secret;
}

function sign(payload: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(payload).digest("base64url");
}

export function generateShareToken(slug: string, prototypes: string[]): string {
  const payload: SharePayload = { s: slug, p: prototypes };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = sign(encoded, getSecret());
  return `${encoded}.${signature}`;
}

export function validateShareToken(
  token: string
): { slug: string; prototypes: string[] } | null {
  const parts = token.split(".");
  if (parts.length !== 2) return null;

  const [encoded, signature] = parts;

  try {
    const expected = sign(encoded, getSecret());
    if (signature !== expected) return null;

    const payload: SharePayload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf-8")
    );

    if (!payload.s || !Array.isArray(payload.p)) return null;

    return { slug: payload.s, prototypes: payload.p };
  } catch {
    return null;
  }
}
