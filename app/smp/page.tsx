import type { Metadata } from "next";
import Link from "next/link";
import { CopyIpButton } from "@/components/CopyIpButton";
import { DiscordLink } from "@/components/DiscordLink";
import { PageHero } from "@/components/PageHero";
import { SeasonCountdown } from "@/components/SeasonCountdown";
import { siteConfig } from "@/lib/config";
import { smp } from "@/lib/smp";

export const metadata: Metadata = {
  title: "Seasonal SMP",
  description: `${smp.seasonName} on FLASHMOB — seasonal wipe survival on the same IP as the party games. ${smp.tagline}`,
};

export default function SmpPage() {
  return (
    <>
      <PageHero
        crumb="SMP"
        title={
          <>
            Seasonal
            <br />
            <span className="hl">SMP</span>
          </>
        }
        lede={smp.lede}
        actions={<CopyIpButton />}
      />

      <section className="section" aria-labelledby="season-title">
        <div className="wrap">
          <h2 id="season-title" className="display display--lg">
            {smp.seasonName}
            <br />
            <span className="hl">is live</span>
          </h2>
          <p className="section-lede">{smp.tagline}</p>
          <div style={{ marginTop: 40, display: "inline-block" }}>
            <SeasonCountdown endsAt={smp.endsAt} />
          </div>

          <div className="stat-grid stat-grid--4" style={{ marginTop: 48 }}>
            {smp.highlights.map((h) => (
              <article className="stat" key={h.title}>
                <h3
                  style={{
                    fontSize: "var(--fs-20)",
                    fontWeight: 800,
                    marginBottom: 8,
                  }}
                >
                  {h.title}
                </h3>
                <p>{h.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="wipe-title" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <h2 id="wipe-title" className="display display--lg">
            How the
            <br />
            <span className="hl">wipe</span> works
          </h2>
          <p className="section-lede">
            Play hard. When the season ends, the world resets. Your account
            stays. The builds don&apos;t.
          </p>
          <ol className="timeline">
            <li className="beat">
              <span className="beat-mark" aria-hidden="true">
                1
              </span>
              <div>
                <span className="when">This season</span>
                <h3>Build, trade, claim</h3>
                <p>
                  Dig in with the crowd. Everything you make lives until the
                  wipe date.
                </p>
              </div>
            </li>
            <li className="beat">
              <span className="beat-mark" aria-hidden="true">
                2
              </span>
              <div>
                <span className="when">Season ends</span>
                <h3>The world closes</h3>
                <p>
                  We announce it in Discord first. Then the map goes dark for
                  the reset.
                </p>
              </div>
            </li>
            <li className="beat">
              <span className="beat-mark" aria-hidden="true">
                3
              </span>
              <div>
                <span className="when">Next season</span>
                <h3>Everyone starts fresh</h3>
                <p>
                  New world. Same portal. Grab friends and be first in the
                  crowd again.
                </p>
              </div>
            </li>
          </ol>

          <div className="idea-grid" style={{ marginTop: 56 }}>
            <article className="idea">
              <h3>What resets</h3>
              <ul className="checks" style={{ marginTop: 16 }}>
                {smp.wipeNotes.resets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="idea">
              <h3>What stays</h3>
              <ul className="checks" style={{ marginTop: 16 }}>
                {smp.wipeNotes.keeps.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="idea">
              <h3>Same address</h3>
              <p style={{ marginTop: 16, color: "var(--lilac)" }}>
                Always <b style={{ color: "var(--white)" }}>{siteConfig.serverAddress}</b>.
                Party games and SMP share the hub.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="join-smp-title">
        <div className="wrap">
          <h2 id="join-smp-title" className="display display--lg">
            How to get
            <br />
            <span className="hl">in</span>
          </h2>
          <ol className="steps" style={{ marginTop: 40 }}>
            {smp.howToJoin.map((step, i) => (
              <li className="step" key={step.title}>
                <span className="step-num display" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                {i === 0 ? (
                  <CopyIpButton
                    className="ip-pill ip-pill--block"
                    actionLabel="Copy"
                  />
                ) : null}
              </li>
            ))}
          </ol>

          <div className="cta-band">
            <div>
              <h2 className="display display--md">See you in the season</h2>
              <p>
                Wipe dates and season news drop in Discord. Rules keep the
                crowd fair.
              </p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <DiscordLink className="btn btn--primary">Discord</DiscordLink>
              <Link className="btn btn--ghost" href="/rules">
                Rules
              </Link>
            </div>
          </div>

          <div className="more-links">
            <Link className="more-link" href="/modes">
              <h3>Game modes →</h3>
              <p>Party games in the same hub.</p>
            </Link>
            <Link className="more-link" href="/mega-shows">
              <h3>Mega Shows →</h3>
              <p>Hourly arenas. Hundreds of players.</p>
            </Link>
            <Link className="more-link" href="/join">
              <h3>How to join →</h3>
              <p>Three steps from desktop to hub.</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
