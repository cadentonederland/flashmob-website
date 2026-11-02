import type { Metadata } from "next";
import Link from "next/link";
import { ModeNav } from "@/components/ModeNav";
import { PageHero } from "@/components/PageHero";
import { modes } from "@/lib/modes";

export const metadata: Metadata = {
  title: "Game modes",
  description:
    "Be Unique, Odd One Out, Titans, Tipping Point, Picture Day and The Gauntlet. Six party games where the crowd is the game.",
};

export default function ModesPage() {
  return (
    <>
      <PageHero
        crumb="Game modes"
        title={
          <>
            Six ways
            <br />
            to <span className="hl">play</span>
          </>
        }
        lede="Pick a portal in the hub and you're in a lobby in seconds. Alone or with friends. Every mode is built around crowds."
      />

      <ModeNav />

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="wrap">
          {modes.map((m) => (
            <article
              key={m.id}
              className="mode-detail"
              id={m.id}
              data-mode-section
              style={{ ["--mode" as string]: m.color }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="mode-detail-icon"
                src={m.tile}
                alt=""
                width={120}
                height={120}
              />
              <div>
                <h2 className="mode-name" style={{ color: "var(--mode)" }}>
                  {m.name}
                  {m.finale ? <span className="tag">Finale</span> : null}
                </h2>
                <p className="mode-line">{m.line}</p>
                <p className="body-copy">{m.body}</p>
                <dl className="mode-facts">
                  <div className="mode-fact">
                    <dt>How you play</dt>
                    <dd>{m.how}</dd>
                  </div>
                  <div className="mode-fact">
                    <dt>Win by</dt>
                    <dd>{m.win}</dd>
                  </div>
                  <div className="mode-fact">
                    <dt>Portal hint</dt>
                    <dd>{m.portal}</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}

          <div className="cta-band">
            <div>
              <h2 className="display display--md">Pick a portal</h2>
              <p>The hub has one for each mode. Walk in whenever you like.</p>
            </div>
            <Link className="btn btn--primary" href="/join">
              How to join
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
