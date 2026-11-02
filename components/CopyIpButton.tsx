"use client";

import { useState } from "react";
import { useToast } from "./ToastProvider";

type Props = {
  className?: string;
  actionLabel?: string;
};

export function CopyIpButton({
  className = "ip-pill",
  actionLabel = "Copy IP",
}: Props) {
  const { address, copyIp } = useToast();
  const [copied, setCopied] = useState(false);

  return (
    <button
      className={`${className}${copied ? " is-copied" : ""}`}
      type="button"
      aria-label={`Copy server address ${address}`}
      onClick={async () => {
        const ok = await copyIp();
        if (!ok) return;
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
    >
      <span>{address}</span>
      <span className="ip-pill-action" aria-hidden="true">
        {copied ? "Copied" : actionLabel}
      </span>
    </button>
  );
}
