import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Create account",
  description:
    "Register for FLASHMOB and verify your Minecraft username in-game with /verify.",
};

export default async function RegisterPage() {
  const session = await getSession();
  if (session) redirect("/account");

  return (
    <AuthShell
      title={
        <>
          Claim your
          <br />
          <span className="hl">name</span>
        </>
      }
      lede="Pick a password, then prove the Minecraft username is yours with /verify."
      footer={
        <>
          Already verified? <Link href="/login">Log in</Link>
        </>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
