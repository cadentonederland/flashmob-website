import { NextResponse } from "next/server";
import { usernameKey } from "@/lib/auth/codes";
import { findByUsernameKey, updateAccount } from "@/lib/auth/store";

/**
 * Called by the Minecraft plugin when a player runs `/verify CODE`.
 *
 * Headers:
 *   Authorization: Bearer <AUTH_PLUGIN_SECRET>
 *
 * Body:
 *   { "username": "Steve", "code": "FM-XXXXXX" }
 */
export async function POST(req: Request) {
  const expected = process.env.AUTH_PLUGIN_SECRET || "dev-plugin-secret";
  const auth = req.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token || token !== expected) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: { username?: string; code?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  const username = (body.username || "").trim();
  const code = (body.code || "").trim().toUpperCase();
  if (!username || !code) {
    return NextResponse.json(
      { error: "Need username and code." },
      { status: 400 },
    );
  }

  const account = await findByUsernameKey(usernameKey(username));
  if (!account) {
    return NextResponse.json(
      { error: "No pending registration for that player.", ok: false },
      { status: 404 },
    );
  }

  if (account.status === "verified") {
    return NextResponse.json({
      ok: true,
      alreadyVerified: true,
      username: account.username,
    });
  }

  if (
    !account.verifyCode ||
    account.verifyCode.toUpperCase() !== code ||
    !account.verifyCodeExpiresAt ||
    new Date(account.verifyCodeExpiresAt).getTime() < Date.now()
  ) {
    return NextResponse.json(
      { error: "Wrong or expired code.", ok: false },
      { status: 400 },
    );
  }

  await updateAccount(account.id, {
    status: "verified",
    verifyCode: null,
    verifyCodeExpiresAt: null,
    verifiedAt: new Date().toISOString(),
  });

  return NextResponse.json({
    ok: true,
    username: account.username,
    message: "Account verified.",
  });
}
