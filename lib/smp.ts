import { siteConfig } from "@/lib/config";

/**
 * Seasonal SMP content. Update this file when a season starts or ends —
 * the /smp page and home teaser read from here.
 */
export const smp = {
  seasonName: "Season 1",
  tagline: "Build fast. The wipe is coming.",
  /** ISO dates — used for “days left” on the page */
  startedAt: "2026-10-01T00:00:00.000Z",
  endsAt: "2027-01-01T00:00:00.000Z",
  lede: "Same IP as the party games. Walk into the SMP portal in the hub and dig in with the crowd — until the season ends and everyone starts fresh.",
  highlights: [
    {
      title: "Claim your land",
      body: "Protect a base. Invite friends. Keep griefers out of the picture.",
    },
    {
      title: "Trade with the crowd",
      body: "Player shops and an economy that moves as people play.",
    },
    {
      title: "Season events",
      body: "Limited runs, challenges and drops while this world is live.",
    },
    {
      title: "Same crowd",
      body: "Party games in the hub. Survival through the portal. One network.",
    },
  ],
  wipeNotes: {
    resets: [
      "Worlds, builds and inventories",
      "Claims, towns and economy balances",
      "Season progress and unlocks",
    ],
    keeps: [
      "Your website account",
      "Cosmetics and ranks you bought",
      "Your Minecraft username link",
    ],
  },
  howToJoin: [
    {
      title: "Join the network",
      body: `Add ${siteConfig.serverAddress} in Multiplayer. Same address as always.`,
    },
    {
      title: "Find the hub",
      body: "Spawn in the FLASHMOB hub. Party portals on one side. SMP on the other.",
    },
    {
      title: "Walk into SMP",
      body: "Hit the Seasonal SMP portal. You're in the survival world in seconds.",
    },
  ],
} as const;

export type SmpConfig = typeof smp;
