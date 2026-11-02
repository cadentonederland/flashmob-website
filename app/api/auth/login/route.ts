import { NextResponse } from "next/server";
import { normalizeUsername, usernameKey } from "@/lib/auth/codes";
import { verifyPassword } from "@/lib/auth/passwords";
import { setSessionCookie } from "@/lib/auth/session";
import { findByUsernameKey } from "@/lib/auth/store";

export async function POST(req: Request) {
  let body: { username?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }

  const username = normalizeUsername(body.username || "");
  const password = body.password || "";
  if (!username || !password) {
    return NextResponse.json(
      { error: "Enter your Minecraft username and password." },
      { status: 400 },
    );
  }

  const account = await findByUsernameKey(usernameKey(username));
  if (!account || !verifyPassword(password, account.passwordHash)) {
    return NextResponse.json(
      { error: "Wrong username or password." },
      { status: 401 },
    );
  }

  if (account.status !== "verified") {
    return NextResponse.json(
      {
        error: "That account isn't verified yet. Finish /verify in-game first.",
        pending: true,
        username: account.username,
      },
      { status: 403 },
    );
  }

  await setSessionCookie({
    id: account.id,
    username: account.username,
    status: account.status,
  });

  return NextResponse.json({
    ok: true,
    username: account.username,
  });
}
