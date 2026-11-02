"use client";

import { useEffect, useState } from "react";

type Props = {
  endsAt: string;
};

export function SeasonCountdown({ endsAt }: Props) {
  // null until mount so server + first client paint match
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const end = new Date(endsAt).getTime();
    const tick = () => {
      const left = end - Date.now();
      if (left <= 0) {
        setLabel("Season ended. Next wipe incoming.");
        return;
      }
      const days = Math.ceil(left / (1000 * 60 * 60 * 24));
      if (days === 1) setLabel("Ends in 1 day");
      else setLabel(`Ends in ${days} days`);
    };
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [endsAt]);

  const endDate = new Date(endsAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="countdown" role="timer" aria-live="off">
      <p className="countdown-label">Season ends {endDate}</p>
      <p className="countdown-time display" style={{ fontSize: "var(--fs-64)" }}>
        {label ?? "—"}
      </p>
    </div>
  );
}
