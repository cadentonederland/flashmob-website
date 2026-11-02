import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import type { Account } from "./types";

const DATA_DIR = path.join(process.cwd(), ".data");
const STORE_PATH = path.join(DATA_DIR, "accounts.json");

type StoreFile = { accounts: Account[] };

async function readStore(): Promise<StoreFile> {
  try {
    const raw = await readFile(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as StoreFile;
    if (!Array.isArray(parsed.accounts)) return { accounts: [] };
    return parsed;
  } catch {
    return { accounts: [] };
  }
}

async function writeStore(store: StoreFile): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
}

export async function listAccounts(): Promise<Account[]> {
  return (await readStore()).accounts;
}

export async function findByUsernameKey(
  key: string,
): Promise<Account | undefined> {
  const accounts = await listAccounts();
  return accounts.find((a) => a.usernameKey === key);
}

export async function findByVerifyCode(
  code: string,
): Promise<Account | undefined> {
  const normalized = code.trim().toUpperCase();
  const accounts = await listAccounts();
  return accounts.find(
    (a) => a.verifyCode && a.verifyCode.toUpperCase() === normalized,
  );
}

export async function saveAccount(account: Account): Promise<Account> {
  const store = await readStore();
  const idx = store.accounts.findIndex((a) => a.id === account.id);
  if (idx >= 0) store.accounts[idx] = account;
  else store.accounts.push(account);
  await writeStore(store);
  return account;
}

export async function updateAccount(
  id: string,
  patch: Partial<Account>,
): Promise<Account | null> {
  const store = await readStore();
  const idx = store.accounts.findIndex((a) => a.id === id);
  if (idx < 0) return null;
  const next = { ...store.accounts[idx]!, ...patch };
  store.accounts[idx] = next;
  await writeStore(store);
  return next;
}
