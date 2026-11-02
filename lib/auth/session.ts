import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import type { PublicAccount } from "./types";

const COOKIE = "fm_session";
const MAX_AGE = 60 * 60 * 24 * 14; // 14 days

function secret() {
  return (
    process.env.AUTH_SECRET ||
    "flashmob-dev-secret-change-me-before-launch"
  );
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function encodeSession(account: PublicAccount): string {
  const body = Buffer.from(
    JSON.stringify({
      id: account.id,
      username: account.username,
      status: account.status,
      exp: Date.now() + MAX_AGE * 1000,
    }),
  ).toString("base64url");
  return `${body}.${sign(body)}`;
}

export function decodeSession(token: string): PublicAccount | null {
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = sign(body);
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }
  try {
    const data = JSON.parse(
      Buffer.from(body, "base64url").toString("utf8"),
    ) as PublicAccount & { exp: number };
    if (!data.exp || data.exp < Date.now()) return null;
    if (data.status !== "verified") return null;
    return { id: data.id, username: data.username, status: data.status };
  } catch {
    return null;
  }
}

export async function setSessionCookie(account: PublicAccount) {
  const jar = await cookies();
  jar.set(COOKIE, encodeSession(account), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearSessionCookie() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function getSession(): Promise<PublicAccount | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;
  return decodeSession(token);
}
