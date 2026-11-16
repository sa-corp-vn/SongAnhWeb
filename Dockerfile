# Website Song Anh — Next.js + Payload CMS (SQLite)
# Build:  docker build -t songanh-web .
# Chạy:   docker compose up -d   (xem docker-compose.yml)

FROM node:22-alpine AS base
RUN apk add --no-cache libc6-compat

# 1) Cài thư viện
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json .npmrc ./
RUN npm ci --no-audit --no-fund --fetch-retries=5 --fetch-retry-mintimeout=20000 --fetch-retry-maxtimeout=120000

# 2) Build. Cần sẵn cơ sở dữ liệu (data/sa.db) và ảnh CMS (media/) để dựng sẵn các trang.
FROM base AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1 NEXT_OUTPUT=standalone
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 3) Chạy
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Dữ liệu CMS: gắn volume vào /app/data (SQLite) và /app/media (ảnh tải lên)
RUN mkdir -p data media && chown nextjs:nodejs data media
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
