import Link from "next/link";
import { CrowdCanvas } from "@/components/CrowdCanvas";
import { CopyIpButton } from "@/components/CopyIpButton";
import { DiscordLink } from "@/components/DiscordLink";
import { GameScreen } from "@/components/GameScreen";
import { MegaCountdown } from "@/components/MegaCountdown";
import { PixelArt } from "@/components/PixelArt";
import { PlayerCount } from "@/components/PlayerCount";
import { modes } from "@/lib/modes";
import { smp } from "@/lib/smp";

export default function HomePage() {
  return (
    <>
      <section className="hero" id="top" aria-labelledby="hero-title">
        <CrowdCanvas variant="hero" boltBesideId="hero-title" />
        <div className="wrap hero-inner">
          <p className="eyebrow">
            Minecraft party games <span aria-hidden="true">·</span> Java Edition
          </p>
          <h1 id="hero-title" className="display display--xl echoes">
            The crowd
            <br />
            is the game
          </h1>
          <p className="lede">
            Hop into a lobby whenever you like and play against your lobby and
            everyone who ever played before.
          </p>
          <div className="hero-actions">
            <CopyIpButton />
            <DiscordLink className="btn btn--ghost">Join the Discord</DiscordLink>
          </div>
          <PlayerCount />
        </div>
      </section>

      <section className="section ideas" aria-labelledby="ideas-title">
        <div className="wrap">
          <h2 id="ideas-title" className="display display--lg">
            Every square
            <br />
            is a <span className="hl">player</span>
          </h2>
          <p className="section-lede">
            Hundreds of players answer, vote, balance and build together. Our
            logo is 51 of them making a lightning bolt.
          </p>
          <div className="idea-grid">
            <article className="idea">
              <PixelArt kind="crowd" />
              <h3>The crowd</h3>
              <p>
                Every mode is built around crowds. The more of you there are,
                the better it gets.
              </p>
            </article>
            <article className="idea">
              <PixelArt kind="odd" />
              <h3>The odd one out</h3>
              <p>
                One player always stands out of line. Say the thing nobody else
                says, and that player is you.
              </p>
            </article>
            <article className="idea">
              <PixelArt kind="echo" />
              <h3>Echoes</h3>
              <p>
                Fading copies of past players fill every lobby. You&apos;re
                never playing alone.{" "}
                <Link
                  href="/echoes"
                  style={{
                    color: "var(--yellow)",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Read more →
                </Link>
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section modes" id="modes" aria-labelledby="modes-title">
        <div className="wrap">
          <h2 id="modes-title" className="display display--lg">
            Six ways
            <br />
            to <span className="hl">play</span>
          </h2>
          <p className="section-lede">
            Pick a portal in the hub and you&apos;re in a lobby in seconds.
            Alone or with friends.
          </p>
          <ul className="mode-grid">
            {modes.map((m) => (
              <li
                key={m.id}
                className={`mode${m.finale ? " mode--finale" : ""}`}
                style={{ ["--mode" as string]: m.color }}
              >
                <Link
                  href={`/modes#${m.id}`}
                  style={{ color: "inherit", textDecoration: "none", display: "block" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="mode-icon"
                    src={m.tile}
                    alt=""
                    width={72}
                    height={72}
                  />
                  <h3 className="mode-name">
                    {m.name}
                    {m.finale ? <span className="tag">Finale</span> : null}
                  </h3>
                  <p className="mode-line">{m.line}</p>
                  <p className="mode-hint">{m.hint}</p>
                </Link>
              </li>
            ))}
          </ul>
          <p style={{ marginTop: 32 }}>
            <Link className="btn btn--ghost" href="/modes">
              All game modes
            </Link>
          </p>
        </div>
      </section>

      <section
        className="section echo-section"
        id="echoes"
        aria-labelledby="echoes-title"
      >
        <div className="wrap split">
          <div className="split-copy">
            <h2 id="echoes-title" className="display display--lg echoes">
              Never an
              <br />
              empty lobby
            </h2>
            <p className="section-lede">
              Echoes are recordings of past players. They fill every lobby, so
              you&apos;re always up against the whole community, even at 4 a.m.
            </p>
            <ul className="checks">
              <li>Your answers become someone else&apos;s Echo.</li>
              <li>See how your pick stacks up against every player ever.</li>
              <li>Be the first to say something. We&apos;ll remember.</li>
            </ul>
            <p style={{ marginTop: 28 }}>
              <Link className="btn btn--ghost" href="/echoes">
                About Echoes
              </Link>
            </p>
          </div>
          <GameScreen />
        </div>
      </section>

      <section
        className="section mega"
        id="mega-shows"
        aria-labelledby="mega-title"
      >
        <CrowdCanvas variant="mega" />
        <div className="wrap mega-inner">
          <h2 id="mega-title" className="display display--lg">
            Mega Shows
            <br />
            <span className="hl">every hour</span>
          </h2>
          <p className="section-lede">
            Once an hour, hundreds of players pile into one arena. Same
            questions, one giant crowd, one winner.
          </p>
          <MegaCountdown compact />
          <p style={{ marginTop: 28 }}>
            <Link className="btn btn--primary" href="/mega-shows">
              Mega Show details
            </Link>
          </p>
        </div>
      </section>

      <section className="section" id="smp" aria-labelledby="smp-home-title">
        <div className="wrap">
          <h2 id="smp-home-title" className="display display--lg">
            Seasonal
            <br />
            <span className="hl">SMP</span>
          </h2>
          <p className="section-lede">
            {smp.seasonName}: {smp.tagline} Same IP — walk into the portal in
            the hub. When the season ends, the world wipes and everyone starts
            fresh.
          </p>
          <p style={{ marginTop: 32 }}>
            <Link className="btn btn--primary" href="/smp">
              SMP details
            </Link>
          </p>
        </div>
      </section>

      <section className="section join" id="join" aria-labelledby="join-title">
        <div className="wrap">
          <h2 id="join-title" className="display display--lg">
            Join in
            <br />
            <span className="hl">three steps</span>
          </h2>
          <ol className="steps">
            <li className="step">
              <span className="step-num display" aria-hidden="true">
                1
              </span>
              <h3>Open Minecraft</h3>
              <p>
                Launch Java Edition and choose <b>Multiplayer</b>.
              </p>
            </li>
            <li className="step">
              <span className="step-num display" aria-hidden="true">
                2
              </span>
              <h3>Add the server</h3>
              <p>
                Click <b>Add Server</b> and paste the address.
              </p>
              <CopyIpButton className="ip-pill ip-pill--block" actionLabel="Copy" />
            </li>
            <li className="step">
              <span className="step-num display" aria-hidden="true">
                3
              </span>
              <h3>Walk into a portal</h3>
              <p>
                Pick a mode — or the SMP portal — in the hub. You&apos;re in
                within seconds. Bring friends with <code>/party invite</code>.
              </p>
            </li>
          </ol>
          <p style={{ marginTop: 32 }}>
            <Link className="btn btn--ghost" href="/join">
              Full join guide &amp; FAQ
            </Link>
          </p>
        </div>
      </section>

      <section className="section discord" aria-labelledby="discord-title">
        <div className="wrap">
          <div className="discord-card">
            <div>
              <h2 id="discord-title" className="display display--md">
                Find your crowd
              </h2>
              <p>
                New modes and Mega Show times in #announcements. Your best
                moments in #clips. A team in #find-a-party.
              </p>
            </div>
            <DiscordLink className="btn btn--primary">
              Join the Discord
            </DiscordLink>
          </div>
        </div>
      </section>
    </>
  );
}
