"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { CopyIpButton } from "@/components/CopyIpButton";
import { siteConfig } from "@/lib/config";

type Step = "form" | "verify" | "done";

export function RegisterForm() {
  const [step, setStep] = useState<Step>("form");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [checking, setChecking] = useState(false);

  const pollStatus = useCallback(async () => {
    if (!username) return;
    setChecking(true);
    try {
      const res = await fetch(
        `/api/auth/verify-status?username=${encodeURIComponent(username)}`,
      );
      const data = await res.json();
      if (data.status === "verified") {
        setStep("done");
        return;
      }
      if (data.status === "expired") {
        setError("That code expired. Start again for a fresh one.");
      }
    } finally {
      setChecking(false);
    }
  }, [username]);

  useEffect(() => {
    if (step !== "verify") return;
    const id = setInterval(() => {
      void pollStatus();
    }, 4000);
    return () => clearInterval(id);
  }, [step, pollStatus]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Those passwords don't match.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Couldn't start registration.");
        return;
      }
      setUsername(data.username);
      setVerifyCode(data.verifyCode);
      setExpiresAt(data.expiresAt);
      setStep("verify");
    } catch {
      setError("Network glitch. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(verifyCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError(`Couldn't copy. The code is ${verifyCode}.`);
    }
  }

  if (step === "done") {
    return (
      <div className="auth-success">
        <p className="auth-success-mark display" aria-hidden="true">
          ✓
        </p>
        <h2 className="display display--md">You&apos;re in</h2>
        <p>
          <b>{username}</b> is verified. Log in and own the lobby.
        </p>
        <Link className="btn btn--primary auth-submit" href="/login">
          Log in
        </Link>
      </div>
    );
  }

  if (step === "verify") {
    const command = `/verify ${verifyCode}`;
    return (
      <div className="verify-panel">
        <ol className="verify-steps">
          <li>
            <span className="verify-num">1</span>
            <div>
              <h3>Join the server</h3>
              <p>Add {siteConfig.serverAddress} and hop in.</p>
              <CopyIpButton className="ip-pill ip-pill--block" actionLabel="Copy" />
            </div>
          </li>
          <li>
            <span className="verify-num">2</span>
            <div>
              <h3>Run this in chat</h3>
              <p>Must be logged in as <b>{username}</b>.</p>
              <button
                type="button"
                className="verify-code"
                onClick={copyCode}
                aria-label={`Copy command ${command}`}
              >
                <code>{command}</code>
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
              {expiresAt ? (
                <p className="verify-expiry">
                  Code expires{" "}
                  {new Date(expiresAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  .
                </p>
              ) : null}
            </div>
          </li>
          <li>
            <span className="verify-num">3</span>
            <div>
              <h3>We&apos;ll catch it</h3>
              <p>
                This page watches for your verify. Stay put after you run the
                command.
              </p>
              <p className={`verify-live${checking ? " is-checking" : ""}`}>
                <span className="live-dot" aria-hidden="true" />
                Waiting for <b>{username}</b> to verify…
              </p>
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => void pollStatus()}
                disabled={checking}
              >
                {checking ? "Checking…" : "I ran the command"}
              </button>
              {process.env.NODE_ENV === "development" ? (
                <button
                  type="button"
                  className="auth-link-btn"
                  style={{ marginTop: 12 }}
                  onClick={async () => {
                    await fetch("/api/auth/dev-simulate-verify", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ username, code: verifyCode }),
                    });
                    await pollStatus();
                  }}
                >
                  Dev: simulate /verify
                </button>
              ) : null}
            </div>
          </li>
        </ol>
        {error ? (
          <p className="auth-error" role="alert">
            {error}
          </p>
        ) : null}
        <button
          type="button"
          className="auth-link-btn"
          onClick={() => {
            setStep("form");
            setError("");
          }}
        >
          ← Start over
        </button>
      </div>
    );
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
          placeholder="Exact IGN"
          required
          minLength={3}
          maxLength={16}
          pattern="[A-Za-z0-9_]{3,16}"
          title="3–16 letters, numbers or underscore"
        />
      </label>
      <label className="auth-field">
        <span>Password</span>
        <input
          name="password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 characters"
          required
          minLength={8}
        />
      </label>
      <label className="auth-field">
        <span>Confirm password</span>
        <input
          name="confirm"
          type="password"
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Same again"
          required
          minLength={8}
        />
      </label>

      <p className="auth-hint">
        Next you&apos;ll get a one-time code. Join the server and run{" "}
        <code>/verify</code> with it. That proves the account is yours.
      </p>

      {error ? (
        <p className="auth-error" role="alert">
          {error}
        </p>
      ) : null}

      <button className="btn btn--primary auth-submit" type="submit" disabled={loading}>
        {loading ? "Creating…" : "Get my verify code"}
      </button>
    </form>
  );
}
