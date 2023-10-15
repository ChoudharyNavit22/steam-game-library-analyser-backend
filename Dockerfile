ARG BASE_IMAGE=node:18.15-alpine3.16
FROM $BASE_IMAGE AS builder
WORKDIR /app

COPY *.* ./
COPY yarn.lock ./yarn.lock

COPY packages/steam-sdk ./packages/steam-sdk

RUN yarn

WORKDIR /app/services/platform-middleware

RUN yarn build

ENV PORT=8000

WORKDIR /app

EXPOSE 8000
CMD ["yarn", "start:dev"]