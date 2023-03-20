FROM node:18-alpine AS base
RUN corepack enable && corepack prepare pnpm@latest --activate 
RUN apk add --no-cache libc6-compat

FROM base AS deps
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm i

FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN pnpm i ts-node typescript

RUN addgroup --system --gid 1001 nodejs
RUN adduser  --system --uid 1001 fastify

COPY --from=deps    --chown=fastify:nodejs /app/package.json ./package.json
COPY --from=deps    --chown=fastify:nodejs /app/node_modules/ ./node_modules/
COPY --from=builder --chown=fastify:nodejs /app/dist/ ./

USER fastify

EXPOSE 8080

ENV PORT 8080

CMD ["pnpm", "start:prd"]
