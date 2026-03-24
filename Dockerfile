FROM node:24 AS jellyload

WORKDIR /app
COPY . /app

RUN pnpm install
RUN pnpm run build

EXPOSE 3000

CMD ["npm", "start"]
