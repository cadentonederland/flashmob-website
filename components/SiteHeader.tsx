"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CopyIpButton } from "./CopyIpButton";
import { DiscordLink } from "./DiscordLink";

const NAV = [
  { href: "/modes", label: "Game modes" },
  { href: "/smp", label: "SMP" },
  { href: "/mega-shows", label: "Mega Shows" },
  { href: "/echoes", label: "Echoes" },
  { href: "/join", label: "How to join" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`site-header${scrolled ? " is-scrolled" : ""}`}
      data-header
    >
      <div className="wrap header-inner">
        <Link className="brand" href="/" aria-label="FLASHMOB home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo/flashmob-horizontal-full-color-on-dark.svg"
            alt="FLASHMOB"
            width={176}
            height={50}
          />
        </Link>
        <nav className="nav" aria-label="Main">
          <button
            className="nav-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="nav-list"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="nav-toggle-cells" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="sr-only">Menu</span>
          </button>
          <ul id="nav-list" className={`nav-list${open ? " is-open" : ""}`}>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <DiscordLink>Discord</DiscordLink>
            </li>
            <li>
              <Link
                href="/login"
                className="nav-login"
                aria-current={
                  pathname === "/login" || pathname === "/register"
                    ? "page"
                    : undefined
                }
              >
                Log in
              </Link>
            </li>
            <li className="nav-ip">
              <CopyIpButton className="ip-pill ip-pill--block" actionLabel="Copy IP" />
            </li>
          </ul>
        </nav>
        <div className="header-actions">
          <Link
            href="/login"
            className="btn btn--ghost header-login"
            aria-current={
              pathname === "/login" || pathname === "/account" ? "page" : undefined
            }
          >
            Log in
          </Link>
          <CopyIpButton className="ip-pill ip-pill--small header-ip" actionLabel="Copy" />
        </div>
      </div>
    </header>
  );
}
