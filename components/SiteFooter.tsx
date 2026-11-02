import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { DiscordLink } from "./DiscordLink";

const COLS = [
  {
    title: "Play",
    links: [
      { href: "/modes", label: "Game modes" },
      { href: "/smp", label: "SMP" },
      { href: "/mega-shows", label: "Mega Shows" },
      { href: "/echoes", label: "Echoes" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/join", label: "How to join" },
      { href: "/join#faq", label: "FAQ" },
      { href: "/rules", label: "Rules" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/login", label: "Log in" },
      { href: "/register", label: "Create account" },
    ],
  },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <Link href="/" aria-label="FLASHMOB home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo/flashmob-stacked-full-color-on-dark.svg"
              alt="FLASHMOB"
              width={150}
              height={150}
            />
          </Link>
          <p>{siteConfig.tagline}</p>
        </div>
        <div className="footer-cols">
          {COLS.map((col) => (
            <nav className="footer-col" aria-label={col.title} key={col.title}>
              <p className="footer-col-title">{col.title}</p>
              {col.links.map((l) => (
                <Link key={l.href} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </nav>
          ))}
          <nav className="footer-col" aria-label="Community">
            <p className="footer-col-title">Community</p>
            <DiscordLink>Discord</DiscordLink>
            <Link href="/account">My account</Link>
          </nav>
        </div>
        <div className="footer-legal">
          <p>{siteConfig.legal}</p>
          <p>
            © {year} FLASHMOB. Set in Bungee and Rubik, both under the SIL Open
            Font License.
          </p>
        </div>
      </div>
    </footer>
  );
}
