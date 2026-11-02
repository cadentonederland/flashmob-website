import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";
import { getSession } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your FLASHMOB account with your Minecraft username.",
};

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect("/account");

  return (
    <AuthShell
      title={
        <>
          Back in the
          <br />
          <span className="hl">crowd</span>
        </>
      }
      lede="Log in with the Minecraft username you verified in-game."
      footer={
        <>
          New here?{" "}
          <Link href="/register">Create an account</Link>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
