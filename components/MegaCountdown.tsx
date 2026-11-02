"use client";

import { useEffect, useState } from "react";

const DOORS_MINUTES = 5;

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function nextShow(from: Date) {
  const d = new Date(from);
  d.setHours(from.getHours() + 1, 0, 0, 0);
  return d;
}

function clock(d: Date) {
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function until(ms: number) {
  const min = Math.max(1, Math.round(ms / 60000));
  if (min < 60) return `in ${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `in ${h} h ${m} min` : `in ${h} h`;
}

type Props = {
  showSchedule?: boolean;
  scheduleCount?: number;
  compact?: boolean;
};

export function MegaCountdown({
  showSchedule = false,
  scheduleCount = 6,
  compact = false,
}: Props) {
  // null until mount so server + first client paint match (avoids hydration mismatch)
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) {
    return (
      <>
        <div className="countdown" role="timer" aria-live="off">
          <p className="countdown-label">
            {compact ? "Next show starts in" : "Live at --:--"}
          </p>
          <p className="countdown-time display">--:--</p>
        </div>
        {!compact && (
          <p className="doors">Doors open {DOORS_MINUTES} minutes before.</p>
        )}
        {showSchedule && (
          <>
            <h3 className="display display--md" style={{ marginTop: 64 }}>
              Coming up
            </h3>
            <ol className="show-list" aria-label="Upcoming Mega Shows" />
          </>
        )}
      </>
    );
  }

  const next = nextShow(now);
  const left = Math.max(0, Math.floor((next.getTime() - now.getTime()) / 1000));
  const text = `${pad(Math.floor(left / 60))}:${pad(left % 60)}`;
  const doorsOpen = left <= DOORS_MINUTES * 60;

  const rows = [];
  if (showSchedule) {
    let show = nextShow(now);
    for (let i = 0; i < scheduleCount; i++) {
      const doors = new Date(show.getTime() - DOORS_MINUTES * 60000);
      rows.push({
        key: show.getTime(),
        time: clock(show),
        doors: clock(doors),
        in: until(show.getTime() - now.getTime()),
        next: i === 0,
      });
      show = nextShow(show);
    }
  }

  return (
    <>
      <div className="countdown" role="timer" aria-live="off">
        <p className="countdown-label">
          {compact ? (
            "Next show starts in"
          ) : (
            <>
              Live at <span>{clock(next)}</span>
            </>
          )}
        </p>
        <p className="countdown-time display">{text}</p>
      </div>
      {!compact && (
        <p className={`doors${doorsOpen ? " is-open" : ""}`}>
          {doorsOpen
            ? "Doors are open. Walk into the portal now."
            : `Doors open ${DOORS_MINUTES} minutes before.`}
        </p>
      )}
      {showSchedule && (
        <>
          <h3 className="display display--md" style={{ marginTop: 64 }}>
            Coming up
          </h3>
          <ol className="show-list" aria-label="Upcoming Mega Shows">
            {rows.map((row) => (
              <li
                key={row.key}
                className={`show-row${row.next ? " is-next" : ""}`}
              >
                <span className="show-time display">{row.time}</span>
                <span className="show-meta">
                  {row.next ? <b>Next show</b> : "Mega Show"}{" "}
                  <span className="dim">Doors open {row.doors}</span>
                </span>
                <span className="show-in">{row.in}</span>
              </li>
            ))}
          </ol>
        </>
      )}
    </>
  );
}
