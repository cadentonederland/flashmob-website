import { NextResponse } from "next/server";
import { usernameKey } from "@/lib/auth/codes";
import { findByUsernameKey, updateAccount } from "@/lib/auth/store";

/** Local testing only — pretends the player ran `/verify` in-game. */
export async function POST(req: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available." }, { status: 404 });
  }

  let body: { username?: string; code?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  const account = await findByUsernameKey(usernameKey(body.username || ""));
  if (!account || account.status !== "pending") {
    return NextResponse.json({ error: "No pending account." }, { status: 404 });
  }
  if (
    !account.verifyCode ||
    account.verifyCode.toUpperCase() !== (body.code || "").trim().toUpperCase()
  ) {
    return NextResponse.json({ error: "Code mismatch." }, { status: 400 });
  }

  await updateAccount(account.id, {
    status: "verified",
    verifyCode: null,
    verifyCodeExpiresAt: null,
    verifiedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
