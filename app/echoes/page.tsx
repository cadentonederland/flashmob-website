import type { Metadata } from "next";
import Link from "next/link";
import { GameScreen } from "@/components/GameScreen";
import { PageHero } from "@/components/PageHero";
import { PixelArt } from "@/components/PixelArt";

export const metadata: Metadata = {
  title: "Echoes",
  description:
    "Echoes are recordings of past FLASHMOB players. They fill every lobby so you're always playing against the whole community.",
};

export default function EchoesPage() {
  return (
    <>
      <PageHero
        crumb="Echoes"
        titleClassName="display display--xl echoes"
        title={
          <>
            Never an
            <br />
            empty lobby
          </>
        }
        lede="Echoes are recordings of past players. They fill every lobby, so you're always up against the whole community, even at 4 a.m."
      />

      <section className="section" aria-labelledby="what-echoes">
        <div className="wrap split">
          <div className="split-copy">
            <h2 id="what-echoes" className="display display--lg">
              What are
              <br />
              <span className="hl">Echoes?</span>
            </h2>
            <PixelArt kind="echo-large" className="echo-art" />
            <div className="prose">
              <p>
                Every answer you give, every spot you stand on, every move you
                make can become an Echo for the next lobby.
              </p>
              <p className="dim">
                Echoes always show in Echo Lilac. They fade. They&apos;re the
                past players who make every lobby feel full.
              </p>
            </div>
          </div>
          <div>
            <article className="panel">
              <h3>Your answers become Echoes</h3>
              <p style={{ color: "var(--lilac)", marginTop: 10 }}>
                Say axolotl first and we&apos;ll remember. The next thousand
                lobbies get that Echo.
              </p>
            </article>
            <article className="panel">
              <h3>Stats against everyone</h3>
              <p style={{ color: "var(--lilac)", marginTop: 10 }}>
                See how rare your pick was. &quot;Only 0.4% of all players ever
                said sniffer.&quot;
              </p>
            </article>
            <article className="panel">
              <h3>Late night still full</h3>
              <p style={{ color: "var(--lilac)", marginTop: 10 }}>
                Not enough live players? Echoes fill the lobby. The show still
                goes on.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="in-game" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <h2 id="in-game" className="display display--lg">
            How it looks
            <br />
            <span className="hl">in-game</span>
          </h2>
          <p className="section-lede">
            Echo stats land in chat. Figures tint lilac. The crowd never looks
            alone.
          </p>
          <div style={{ marginTop: 40, maxWidth: 720 }}>
            <GameScreen />
          </div>
          <div className="more-links">
            <Link className="more-link" href="/mega-shows">
              <h3>Mega Shows →</h3>
              <p>Hourly arenas packed with live players and Echoes.</p>
            </Link>
            <Link className="more-link" href="/modes">
              <h3>Game modes →</h3>
              <p>Where your answers become part of the show.</p>
            </Link>
            <Link className="more-link" href="/join">
              <h3>How to join →</h3>
              <p>Add the server and leave your first Echo.</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
