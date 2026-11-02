"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/config";

const LINES = [
  {
    html: `<span class="bolt y">⚡︎</span> You joined the queue for <span style="color:#A66BFF">Be Unique</span>. <span class="dim">(6 waiting)</span>`,
  },
  { html: `<span class="bolt y">⚡︎</span> Lobby found. Sending you in.` },
  {
    html: `<b style="color:#A66BFF">Round 3</b> Name a food. Answer in chat.`,
  },
  {
    html: `<span class="y">You</span> <span class="dim">›</span> pizza`,
    className: "me",
  },
  {
    html: `<span class="bolt pink">⚡︎</span> 14 others also said pizza. You're in the audience now.`,
  },
  {
    html: `<span class="bolt">⚡︎</span> Only 0.4% of all players ever said <span class="y">sniffer</span>.`,
    className: "dim",
  },
];

export function GameScreen() {
  const [shown, setShown] = useState(0);
  const [seconds, setSeconds] = useState(12);
  const chatRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = chatRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || reduced) {
      setShown(LINES.length);
      return;
    }
    let timers: ReturnType<typeof setTimeout>[] = [];
    let running = false;
    const play = () => {
      running = true;
      setShown(0);
      timers.forEach(clearTimeout);
      timers = LINES.map((_, i) =>
        setTimeout(() => setShown(i + 1), 400 + i * 1100),
      );
      timers.push(setTimeout(() => {
        running = false;
      }, 400 + LINES.length * 1100));
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !running) play();
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => (s <= 0 ? 12 : s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <figure
      className="game-screen"
      aria-label="Example of in-game chat and sidebar during a Be Unique round"
    >
      <div className="bossbar" aria-hidden="true">
        <span className="bossbar-text">
          Answer in chat <span className="dim">·</span>{" "}
          <span className="y">{seconds}s</span>
        </span>
        <span className="bossbar-track">
          <span
            className="bossbar-fill"
            style={{
              transform: `scaleX(${seconds / 12})`,
              transition: seconds === 12 ? "none" : "transform 1s linear",
            }}
          />
        </span>
      </div>
      <ol className="chat is-playing" ref={chatRef}>
        {LINES.map((line, i) => (
          <li
            key={i}
            className={`${line.className ?? ""}${i < shown ? " is-shown" : ""}`}
            dangerouslySetInnerHTML={{ __html: line.html }}
          />
        ))}
      </ol>
      <aside className="sidebar" aria-hidden="true">
        <p className="sidebar-title">FLASHMOB</p>
        <p className="dim sb-label">Mode</p>
        <p className="sb-value" style={{ color: "#A66BFF" }}>
          Be Unique
        </p>
        <p className="dim sb-label">Players left</p>
        <p className="sb-value">
          41<span className="dim"> / 86</span>
        </p>
        <p className="dim sb-label">Round</p>
        <p className="sb-value">3</p>
        <p className="y sidebar-ip">{siteConfig.serverAddress}</p>
      </aside>
    </figure>
  );
}
