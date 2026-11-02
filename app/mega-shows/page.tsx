import type { Metadata } from "next";
import Link from "next/link";
import { CopyIpButton } from "@/components/CopyIpButton";
import { MegaCountdown } from "@/components/MegaCountdown";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Mega Shows",
  description:
    "Once an hour, hundreds of players pile into one arena on FLASHMOB. Same questions, one giant crowd, one winner.",
};

export default function MegaShowsPage() {
  return (
    <>
      <PageHero
        crumb="Mega Shows"
        variant="mega"
        title={
          <>
            Mega Shows
            <br />
            <span className="hl">every hour</span>
          </>
        }
        lede="Hundreds of players. One arena. Same questions as the lobbies, just bigger, louder and with Echoes from every show that came before."
        actions={<CopyIpButton />}
      />

      <section className="section" aria-labelledby="next-title">
        <div className="wrap">
          <h2 id="next-title" className="display display--lg">
            Next show
            <br />
            <span className="hl">starts in</span>
          </h2>
          <div style={{ marginTop: 40, display: "inline-block" }}>
            <MegaCountdown showSchedule />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="what-title" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <h2 id="what-title" className="display display--lg">
            What is a
            <br />
            <span className="hl">Mega Show?</span>
          </h2>
          <p className="section-lede">
            A normal lobby is a few dozen players. A Mega Show is the whole
            crowd in one place, once every hour, on the hour.
          </p>
          <div className="stat-grid">
            <article className="stat">
              <p className="stat-num">500+</p>
              <p>Players in one arena when the show fills up.</p>
            </article>
            <article className="stat">
              <p className="stat-num">60</p>
              <p>Minutes between shows. Never miss more than one.</p>
            </article>
            <article className="stat">
              <p className="stat-num">1</p>
              <p>Winner. Everyone else joins the audience.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="flow-title">
        <div className="wrap">
          <h2 id="flow-title" className="display display--lg">
            How a show
            <br />
            <span className="hl">plays out</span>
          </h2>
          <p className="section-lede">
            Same party games you know. Bigger crowd. The audience never sits
            still.
          </p>
          <ol className="timeline">
            <li className="beat">
              <span className="beat-mark" aria-hidden="true">
                1
              </span>
              <div>
                <span className="when">T−5 minutes</span>
                <h3>Doors open</h3>
                <p>
                  Walk into the Mega Show portal in the hub. Queues fill fast.
                  Parties stay together.
                </p>
              </div>
            </li>
            <li className="beat">
              <span className="beat-mark" aria-hidden="true">
                2
              </span>
              <div>
                <span className="when">On the hour</span>
                <h3>The crowd piles in</h3>
                <p>
                  Hundreds of players drop into one arena. Echoes from past
                  shows already fill the empty spots.
                </p>
              </div>
            </li>
            <li className="beat">
              <span className="beat-mark" aria-hidden="true">
                3
              </span>
              <div>
                <span className="when">Rounds</span>
                <h3>Be Unique, then more</h3>
                <p>
                  Answer in chat. Stand where the fewest stand. Pilot, balance,
                  become the picture. Match anyone and you&apos;re out.
                </p>
              </div>
            </li>
            <li className="beat">
              <span className="beat-mark" aria-hidden="true">
                4
              </span>
              <div>
                <span className="when">You&apos;re out</span>
                <h3>You&apos;re the audience now</h3>
                <p>
                  Losing doesn&apos;t end the show. The audience still votes,
                  builds traps and decides what happens next.
                </p>
              </div>
            </li>
            <li className="beat">
              <span className="beat-mark" aria-hidden="true">
                5
              </span>
              <div>
                <span className="when">Finale</span>
                <h3>The Gauntlet</h3>
                <p>
                  Everyone you beat is now a trap. Survive the finale. One
                  winner walks out. Next show starts in an hour.
                </p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="join-show-title" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <h2 id="join-show-title" className="display display--lg">
            How to get
            <br />
            <span className="hl">in</span>
          </h2>
          <div className="idea-grid" style={{ marginTop: 40 }}>
            <article className="idea">
              <h3>1. Be online</h3>
              <p>
                Join <b>play.flashmob.gg</b> a few minutes early. The hub always
                has the Mega Show portal.
              </p>
            </article>
            <article className="idea">
              <h3>2. Walk in</h3>
              <p>
                Doors open five minutes before the hour. Bring friends with{" "}
                <code>/party invite</code>.
              </p>
            </article>
            <article className="idea">
              <h3>3. Play</h3>
              <p>
                No sign-up. No ticket. If the show is full, the next one is
                sixty minutes away.
              </p>
            </article>
          </div>

          <div className="cta-band">
            <div>
              <h2 className="display display--md">Don&apos;t miss the next one</h2>
              <p>
                Copy the IP, hop in the hub and wait for the doors. See you in
                the crowd.
              </p>
            </div>
            <CopyIpButton />
          </div>

          <div className="more-links">
            <Link className="more-link" href="/modes">
              <h3>Game modes →</h3>
              <p>What you&apos;ll play when the show starts.</p>
            </Link>
            <Link className="more-link" href="/echoes">
              <h3>Echoes →</h3>
              <p>Why the arena never feels empty.</p>
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
