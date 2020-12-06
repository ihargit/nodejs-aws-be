# Base
FROM node:12.20.0 AS base
WORKDIR /app

# Dependencies
FROM base AS dependencies
COPY package*.json ./
RUN npm install

# Build
FROM dependencies AS build
WORKDIR /app
COPY src tsconfig.build.json tsconfig.json /app/
RUN npm run build

# Release
FROM node:12.20.0-alpine3.10 AS release
WORKDIR /app
COPY --from=build app/package*.json ./
RUN npm install --only=production
COPY --from=build app/dist ./

#Application
USER node
ENV PORT=8080
EXPOSE 8080

CMD ["node", "main.js"]