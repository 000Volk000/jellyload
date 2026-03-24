FROM node:24 AS jellyload

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app
COPY . /app

RUN apt update
RUN apt install yt-dlp -y

RUN pnpm install
RUN pnpm run build

EXPOSE 3000

CMD ["npm", "start"]
