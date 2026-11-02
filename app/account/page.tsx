import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Account",
  description: "Your FLASHMOB account.",
};

export default async function AccountPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <AuthShell
      title={
        <>
          Hey,
          <br />
          <span className="hl">{session.username}</span>
        </>
      }
      lede="You're logged in. Shop and more landing here soon."
      footer={
        <>
          <Link href="/">Back home</Link>
        </>
      }
    >
      <div className="account-panel">
        <dl className="account-facts">
          <div>
            <dt>Minecraft</dt>
            <dd>{session.username}</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd className="y">Verified</dd>
          </div>
        </dl>
        <p className="auth-hint">
          Ranks, cosmetics and the shop will hook into this account. For now,
          you&apos;re set.
        </p>
        <LogoutButton />
      </div>
    </AuthShell>
  );
}
