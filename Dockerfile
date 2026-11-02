# FLASHMOB website — production image for EasyPanel / Docker
# Multi-stage build with Next.js standalone output

FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# --- Dependencies ---
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# --- Build ---
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Public env must be present at build time (baked into the client bundle)
ARG NEXT_PUBLIC_SITE_URL=https://flashmob.gg
ARG NEXT_PUBLIC_SERVER_ADDRESS=play.flashmob.gg
ARG NEXT_PUBLIC_DISCORD_URL=
ARG NEXT_PUBLIC_SHOW_PLAYER_COUNT=true

ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_SERVER_ADDRESS=$NEXT_PUBLIC_SERVER_ADDRESS \
    NEXT_PUBLIC_DISCORD_URL=$NEXT_PUBLIC_DISCORD_URL \
    NEXT_PUBLIC_SHOW_PLAYER_COUNT=$NEXT_PUBLIC_SHOW_PLAYER_COUNT \
    NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# --- Runner ---
FROM base AS runner
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Auth account store (mount a volume here in EasyPanel so logins survive redeploys)
RUN mkdir -p .data && chown nextjs:nodejs .data

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
