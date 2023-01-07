FROM node:19-alpine as base

FROM base as react-build
WORKDIR /react-app
ENV NODE_ENV production
COPY ./config/react .
COPY ../../app		.
RUN npm install && npm run test && npm run build

FROM base as nestjs-build
WORKDIR /nestjs-server
ENV NODE_ENV production
COPY ./config/nestjs	.
COPY ../../server		.
RUN npm install && npm install -D @nestjs/serve-static && npm run test && npm run build

FROM base as production
WORKDIR /nestjs-server
COPY --from=nestjs-build /nestjs-server/node_modules ./node_modules
COPY --from=nestjs-build /nestjs-server/dist ./dist
COPY --from=react-build /react-app/build ./client
CMD [ "node", "dist/main.js" ]