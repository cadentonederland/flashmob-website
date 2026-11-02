import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import {
  generateVerifyCode,
  VERIFY_CODE_TTL_MS,
  isValidMinecraftUsername,
  normalizeUsername,
  usernameKey,
} from "@/lib/auth/codes";
import { hashPassword } from "@/lib/auth/passwords";
import { findByUsernameKey, saveAccount, updateAccount } from "@/lib/auth/store";

export async function POST(req: Request) {
  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  const username = normalizeUsername(body.username || "");
  const password = body.password || "";

  if (!isValidMinecraftUsername(username)) {
    return NextResponse.json(
      {
        error:
          "That doesn't look like a Minecraft username. 3–16 letters, numbers or _.",
      },
      { status: 400 },
    );
  }
  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password needs at least 8 characters." },
      { status: 400 },
    );
  }

  const key = usernameKey(username);
  const existing = await findByUsernameKey(key);

  if (existing?.status === "verified") {
    return NextResponse.json(
      { error: "That username already has an account. Log in instead." },
      { status: 409 },
    );
  }

  const code = generateVerifyCode();
  const expires = new Date(Date.now() + VERIFY_CODE_TTL_MS).toISOString();

  if (existing?.status === "pending") {
    const updated = await updateAccount(existing.id, {
      passwordHash: hashPassword(password),
      username,
      verifyCode: code,
      verifyCodeExpiresAt: expires,
    });
    return NextResponse.json({
      username: updated!.username,
      verifyCode: code,
      expiresAt: expires,
      message: "Same username, new code. Run it in-game before it expires.",
    });
  }

  const account = await saveAccount({
    id: randomUUID(),
    username,
    usernameKey: key,
    passwordHash: hashPassword(password),
    status: "pending",
    verifyCode: code,
    verifyCodeExpiresAt: expires,
    createdAt: new Date().toISOString(),
    verifiedAt: null,
  });

  return NextResponse.json({
    username: account.username,
    verifyCode: code,
    expiresAt: expires,
    message: "Code ready. Join the server and run /verify.",
  });
}
