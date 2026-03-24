FROM node:24 AS jellyload

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app
COPY . /app

RUN apt-get update && \
    apt-get install -y python3 python3-mutagen curl && \
    curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/bin/yt-dlp && \
    chmod a+rx /usr/bin/yt-dlp

RUN pnpm install
RUN pnpm run build

EXPOSE 3000

CMD ["npm", "start"]
