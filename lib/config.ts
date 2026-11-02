/**
 * Site-wide settings. Swap these when the domain / Discord go live.
 * Account + shop features will hang off the same config later
 * (e.g. auth providers, Stripe keys via env).
 */
export const siteConfig = {
  name: "FLASHMOB",
  tagline: "The crowd is the game.",
  description:
    "FLASHMOB is a Minecraft party-game network where the crowd is the game. Be Unique, Odd One Out, Titans, Tipping Point, Picture Day and The Gauntlet.",
  serverAddress: process.env.NEXT_PUBLIC_SERVER_ADDRESS || "play.flashmob.gg",
  discordUrl: process.env.NEXT_PUBLIC_DISCORD_URL || "",
  showPlayerCount: process.env.NEXT_PUBLIC_SHOW_PLAYER_COUNT !== "false",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://flashmob.gg",
  legal:
    "Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.",
} as const;

export type SiteConfig = typeof siteConfig;
