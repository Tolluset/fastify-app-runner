FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat

RUN npm i -g pnpm

FROM base AS deps
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm i

FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV production

RUN pnpm build

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser  --system --uid 1001 fastify

COPY --from=deps    --chown=fastify:nodejs /app/package.json ./package.json
COPY --from=deps    --chown=fastify:nodejs /app/node_modules/ ./node_modules/
COPY --from=builder --chown=fastify:nodejs /app/dist/ ./dist/

USER fastify

EXPOSE 8080

ARG SERVER_HOST
ARG SERVER_PORT

ENV SERVER_HOST=$SERVER_HOST
ENV SERVER_PORT=$SERVER_PORT

ARG DB_HOST
ARG DB_PORT
ARG DB_USERNAME
ARG DB_PASSWORD
ARG DB_DATABASE

ENV DB_HOST=$DB_HOST
ENV DB_PORT=$DB_PORT
ENV DB_USERNAME=$DB_USERNAME
ENV DB_PASSWORD=$DB_PASSWORD
ENV DB_DATABASE=$DB_DATABASE

CMD [ "pnpm", "start:prd" ]
