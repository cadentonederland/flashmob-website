import { NextResponse } from "next/server";
import { usernameKey } from "@/lib/auth/codes";
import { findByUsernameKey } from "@/lib/auth/store";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username") || "";
  if (!username) {
    return NextResponse.json({ error: "Missing username." }, { status: 400 });
  }

  const account = await findByUsernameKey(usernameKey(username));
  if (!account) {
    return NextResponse.json({ status: "unknown" });
  }

  const expired =
    account.status === "pending" &&
    account.verifyCodeExpiresAt &&
    new Date(account.verifyCodeExpiresAt).getTime() < Date.now();

  return NextResponse.json({
    status: expired ? "expired" : account.status,
    username: account.username,
    verifyCode: account.status === "pending" ? account.verifyCode : null,
    expiresAt: account.verifyCodeExpiresAt,
  });
}
