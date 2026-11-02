"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setPending(false);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Couldn't log in.");
        if (data.pending) setPending(true);
        return;
      }
      router.push("/account");
      router.refresh();
    } catch {
      setError("Network glitch. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <label className="auth-field">
        <span>Minecraft username</span>
        <input
          name="username"
          autoComplete="username"
          spellCheck={false}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your IGN"
          required
          maxLength={16}
        />
      </label>
      <label className="auth-field">
        <span>Password</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
      </label>

      {error ? (
        <p className="auth-error" role="alert">
          {error}
          {pending ? (
            <>
              {" "}
              <Link href="/register">Finish registration →</Link>
            </>
          ) : null}
        </p>
      ) : null}

      <button className="btn btn--primary auth-submit" type="submit" disabled={loading}>
        {loading ? "Checking…" : "Log in"}
      </button>
    </form>
  );
}
