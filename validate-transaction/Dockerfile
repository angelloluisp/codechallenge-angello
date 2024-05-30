FROM node:18.18-alpine AS builder

WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .
ENV NODE_ENV=production
RUN yarn build

FROM node:18.18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json .
COPY --from=builder /app/dist ./dist
CMD yarn start:prod
