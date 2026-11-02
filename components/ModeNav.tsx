"use client";

import { useEffect } from "react";
import { modes } from "@/lib/modes";

export function ModeNav() {
  useEffect(() => {
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("[data-mode-nav] a"),
    );
    const byId = new Map(links.map((a) => [a.hash.slice(1), a]));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          links.forEach((a) => a.classList.remove("is-active"));
          const link = byId.get(e.target.id);
          if (!link) return;
          link.classList.add("is-active");
          const track = link.parentElement;
          if (track && track.scrollWidth > track.clientWidth) {
            track.scrollTo({ left: link.offsetLeft - 16, behavior: "smooth" });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    document
      .querySelectorAll("[data-mode-section]")
      .forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="mode-nav" aria-label="Jump to a mode" data-mode-nav>
      <div className="wrap">
        <div className="mode-nav-track">
          {modes.map((m) => (
            <a key={m.id} href={`#${m.id}`} style={{ ["--mode" as string]: m.color }}>
              {m.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
