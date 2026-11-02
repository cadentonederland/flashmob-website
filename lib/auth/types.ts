export type AccountStatus = "pending" | "verified";

export type Account = {
  id: string;
  /** Minecraft in-game name (case-insensitive unique key) */
  username: string;
  usernameKey: string;
  passwordHash: string;
  status: AccountStatus;
  verifyCode: string | null;
  verifyCodeExpiresAt: string | null;
  createdAt: string;
  verifiedAt: string | null;
};

export type PublicAccount = {
  id: string;
  username: string;
  status: AccountStatus;
};
