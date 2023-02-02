FROM node:19-alpine as base

FROM base as react-build
WORKDIR /react-app
ENV NODE_ENV production
COPY ./docker/server/config/react .
COPY ./react-app		.
RUN npm install --production && npm run test && npm run build

FROM base as nestjs-build
WORKDIR /nestjs-server
ENV NODE_ENV production
COPY ./docker/server/config/nestjs	.
COPY ./server		.
RUN npm install --production && npm run build && npm run test

FROM base as production
WORKDIR /nestjs-server
COPY --from=nestjs-build /nestjs-server/node_modules ./node_modules
COPY --from=nestjs-build /nestjs-server/dist ./dist
COPY --from=react-build /react-app/build ./client
CMD [ "node", "dist/src/main.js" ]