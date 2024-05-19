FROM node:20-alpine

WORKDIR /app
RUN corepack enable

COPY package.json ./
RUN pnpm install

COPY . .
RUN pnpm build

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
