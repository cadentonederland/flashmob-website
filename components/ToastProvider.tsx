"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { siteConfig } from "@/lib/config";

type ToastCtx = {
  say: (message: string) => void;
  copyIp: () => Promise<boolean>;
  address: string;
  discordUrl: string;
};

const Ctx = createContext<ToastCtx | null>(null);

export function useToast() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

async function writeClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const address = siteConfig.serverAddress;

  const say = useCallback((msg: string) => {
    setMessage(msg);
    setVisible(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(false), 2600);
  }, []);

  const copyIp = useCallback(async () => {
    const ok = await writeClipboard(address);
    if (ok) say(`Copied ${address}. See you in the crowd.`);
    else say(`Couldn't copy. The address is ${address}.`);
    return ok;
  }, [address, say]);

  const value = useMemo(
    () => ({
      say,
      copyIp,
      address,
      discordUrl: siteConfig.discordUrl,
    }),
    [say, copyIp, address],
  );

  return (
    <Ctx.Provider value={value}>
      {children}
      <div
        className={`toast${visible ? " is-visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {message}
      </div>
    </Ctx.Provider>
  );
}
