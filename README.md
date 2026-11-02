# FLASHMOB website

Next.js (App Router) site for the FLASHMOB Minecraft party-game network — party modes, Mega Shows, seasonal SMP, and account verify flow.

## Run locally

```bash
npm install
cp .env.example .env.local   # then edit secrets
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Requires **Node.js 20+** (see `.nvmrc`).

## Configure

| Variable | When | Purpose |
|----------|------|---------|
| `NEXT_PUBLIC_SITE_URL` | **Build** | Canonical URL (SEO / OG) |
| `NEXT_PUBLIC_SERVER_ADDRESS` | **Build** | IP players copy |
| `NEXT_PUBLIC_DISCORD_URL` | **Build** | Discord invite |
| `NEXT_PUBLIC_SHOW_PLAYER_COUNT` | **Build** | Live count via mcsrvstat.us |
| `AUTH_SECRET` | **Runtime** | Signed session cookies |
| `AUTH_PLUGIN_SECRET` | **Runtime** | Bearer token for in-game `/verify` |
| `PORT` | **Runtime** | Listen port (default `3000`) |

`NEXT_PUBLIC_*` values are baked in at **image build** time. Secrets stay runtime-only.

Season SMP copy: edit `lib/smp.ts`.

## Deploy on EasyPanel (Docker)

1. In EasyPanel, create an app from **Git** (or upload) and select **Dockerfile**.
2. Set the Dockerfile path to `Dockerfile` (repo root).
3. Expose / map container port **3000**.
4. Add **build arguments** (or EasyPanel build env) for every `NEXT_PUBLIC_*` you need.
5. Add **runtime environment** for `AUTH_SECRET` and `AUTH_PLUGIN_SECRET` (strong random values).
6. Mount a persistent volume at `/app/.data` so registrations survive redeploys.
7. Deploy. EasyPanel builds the image and runs `node server.js` (Next standalone).

### Local Docker test

```bash
docker compose up --build
```

Then open http://localhost:3000.

In-game verify webhook docs: [`docs/minecraft-verify-plugin.md`](docs/minecraft-verify-plugin.md).

## Structure

| Path | Purpose |
|------|---------|
| `app/` | Routes (home, modes, smp, mega-shows, echoes, join, auth) |
| `components/` | Shared UI |
| `lib/` | Config, modes, SMP season data, auth |
| `public/` | Brand logos, icons, fonts |
| `Dockerfile` | Production image for EasyPanel |
| `docker-compose.yml` | Local / Compose template |

## Accounts & shop later

Register / login + `/verify` webhook use a file store under `.data/` (volume in Docker). Swap for a real DB when you harden production. Shop can hang off the same verified accounts.
