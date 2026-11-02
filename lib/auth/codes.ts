import { randomBytes } from "crypto";

/** Short code for `/verify CODE` in chat — easy to type, hard to guess. */
export function generateVerifyCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = randomBytes(6);
  let out = "";
  for (let i = 0; i < 6; i++) out += alphabet[bytes[i]! % alphabet.length];
  return `FM-${out}`;
}

export function normalizeUsername(username: string): string {
  return username.trim();
}

export function usernameKey(username: string): string {
  return username.trim().toLowerCase();
}

/** Minecraft Java usernames: 3–16 chars, letters, numbers, underscore. */
export function isValidMinecraftUsername(username: string): boolean {
  return /^[A-Za-z0-9_]{3,16}$/.test(username.trim());
}

export const VERIFY_CODE_TTL_MS = 30 * 60 * 1000; // 30 minutes
