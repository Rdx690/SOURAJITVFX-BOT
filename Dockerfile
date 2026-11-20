FROM node:20-bookworm-slim

# git + ffmpeg: needed by some npm deps and media commands
RUN apt-get update && apt-get install -y --no-install-recommends git ffmpeg ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev --no-audit --no-fund

COPY . .

ENV NODE_ENV=production
ENV PORT=8000
EXPOSE 8000

CMD ["node", "index.js"]
