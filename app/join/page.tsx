import type { Metadata } from "next";
import Link from "next/link";
import { CopyIpButton } from "@/components/CopyIpButton";
import { DiscordLink } from "@/components/DiscordLink";
import { PageHero } from "@/components/PageHero";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "How to join",
  description:
    "Join FLASHMOB in three steps. Java Edition. FAQ and party commands.",
};

export default function JoinPage() {
  return (
    <>
      <PageHero
        crumb="How to join"
        title={
          <>
            Join in
            <br />
            <span className="hl">three steps</span>
          </>
        }
        lede="Java Edition. No whitelist. Copy the address, add the server and walk into a portal."
        actions={<CopyIpButton />}
      />

      <section className="section" aria-labelledby="steps-title">
        <div className="wrap">
          <h2 id="steps-title" className="sr-only">
            Steps
          </h2>
          <ol className="steps">
            <li className="step">
              <span className="step-num display" aria-hidden="true">
                1
              </span>
              <h3>Open Minecraft</h3>
              <p>
                Launch <b>Java Edition</b> and choose <b>Multiplayer</b>.
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
                Pick a mode in the hub. You&apos;re in a lobby in seconds. Bring
                friends with <code>/party invite</code>.
              </p>
            </li>
          </ol>

          <h3 className="display display--md" style={{ marginTop: 64 }}>
            What you&apos;ll see
          </h3>
          <p className="section-lede" style={{ marginTop: 12 }}>
            In the multiplayer list it looks like this.
          </p>
          <div className="server-list" aria-label="Server list preview">
            <div className="server-list-row">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/server-icon.png"
                alt=""
                width={64}
                height={64}
              />
              <div className="server-list-motd">
                <p className="l1">
                  <span className="y">FLASHMOB</span>{" "}
                  <span className="l">the crowd is the game</span>
                </p>
                <p>
                  <span className="w">Be Unique</span>{" "}
                  <span className="d">|</span>{" "}
                  <span style={{ color: "#FF7A2F" }}>Titans</span>{" "}
                  <span className="d">|</span>{" "}
                  <span style={{ color: "#38D98A" }}>Tipping Point</span>{" "}
                  <span className="d">|</span> <span className="y">+3 more</span>
                </p>
              </div>
              <span className="server-list-players">0/∞</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="faq" aria-labelledby="faq-title" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <h2 id="faq-title" className="display display--lg">
            FAQ
          </h2>
          <div className="faq">
            <details>
              <summary>Java or Bedrock?</summary>
              <p>Java Edition. Bedrock isn&apos;t supported yet.</p>
            </details>
            <details>
              <summary>Do I need a whitelist?</summary>
              <p>No. Anyone can join. Paste the address and go.</p>
            </details>
            <details>
              <summary>How do I play with friends?</summary>
              <p>
                Use <code>/party invite</code> in chat. Your party queues into
                the same lobby and the same Mega Show.
              </p>
            </details>
            <details>
              <summary>What if a lobby is full?</summary>
              <p>
                That lobby is full. Joining the next one. You&apos;ll stay in
                the queue.
              </p>
            </details>
            <details>
              <summary>When are Mega Shows?</summary>
              <p>
                Once an hour, on the hour. Doors open five minutes before. See
                the{" "}
                <Link href="/mega-shows" style={{ color: "var(--yellow)" }}>
                  Mega Shows page
                </Link>{" "}
                for the countdown.
              </p>
            </details>
            <details>
              <summary>Where is the SMP?</summary>
              <p>
                Same address. In the hub, walk into the Seasonal SMP portal.
                It&apos;s a wipe season — details on the{" "}
                <Link href="/smp" style={{ color: "var(--yellow)" }}>
                  SMP page
                </Link>
                .
              </p>
            </details>
            <details>
              <summary>What are Echoes?</summary>
              <p>
                Recordings of past players that fill lobbies. Read more on the{" "}
                <Link href="/echoes" style={{ color: "var(--yellow)" }}>
                  Echoes page
                </Link>
                .
              </p>
            </details>
            <details>
              <summary>Is this official Minecraft?</summary>
              <p>{siteConfig.legal}</p>
            </details>
          </div>

          <div className="cta-band">
            <div>
              <h2 className="display display--md">Find your crowd</h2>
              <p>
                New modes and Mega Show times in Discord. Clips, parties and
                announcements.
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
