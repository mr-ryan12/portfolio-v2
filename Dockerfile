FROM node:20-alpine AS development-dependencies-env
COPY . /app
WORKDIR /app
RUN corepack enable && yarn install

FROM node:20-alpine AS production-dependencies-env
COPY ./package.json yarn.lock .yarnrc.yml /app/
COPY .yarn /app/.yarn
WORKDIR /app
RUN corepack enable && yarn workspaces focus --all --production

FROM node:20-alpine AS build-env
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN corepack enable && yarn build

FROM node:20-alpine
COPY ./package.json yarn.lock .yarnrc.yml /app/
COPY .yarn /app/.yarn
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
WORKDIR /app
CMD ["yarn", "start"]
