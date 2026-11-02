import type { Metadata } from "next";
import Link from "next/link";
import { DiscordLink } from "@/components/DiscordLink";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Rules",
  description: "FLASHMOB server rules. Keep the show fun for the whole crowd.",
};

const RULES = [
  {
    title: "Be decent",
    body: "No hate, harassment, slurs or targeting people. Playful about losing. Never mean.",
  },
  {
    title: "No cheats",
    body: "No mods, macros or tools that give you an unfair edge. Vanilla client. Fair crowd.",
  },
  {
    title: "Don't spoil the show",
    body: "No spam, lobby griefing or breaking games for everyone else. The crowd is the game.",
  },
  {
    title: "Keep chat clean enough",
    body: "Answers get filtered. Don't try to dodge that. Keep Discord and in-game chat usable for all ages.",
  },
  {
    title: "One account, one player",
    body: "No multi-accounting to win rounds or pad stats. Echoes should be real people.",
  },
  {
    title: "Staff have the last word",
    body: "If something feels off, staff will sort it. Argue in Discord tickets, not mid-round.",
  },
];

export default function RulesPage() {
  return (
    <>
      <PageHero
        crumb="Rules"
        title={
          <>
            Keep the
            <br />
            <span className="hl">show going</span>
          </>
        }
        lede="Short rules. One idea each. Break them and you're out of the crowd for a while."
      />

      <section className="section">
        <div className="wrap">
          <ol className="rule-list">
            {RULES.map((rule, i) => (
              <li className="rule" key={rule.title}>
                <span className="rule-num" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3>{rule.title}</h3>
                  <p>{rule.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="cta-band">
            <div>
              <h2 className="display display--md">Questions?</h2>
              <p>Ask in Discord. Then get back in the hub.</p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <DiscordLink className="btn btn--ghost">Discord</DiscordLink>
              <Link className="btn btn--primary" href="/join">
                How to join
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
