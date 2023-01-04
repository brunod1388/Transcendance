FROM node:19-alpine as base
WORKDIR /server

FROM base as react
COPY ./.config/react .
COPY ./app .
RUN npm install && npm run build

FROM base as nestjs
COPY ./.config/nestjs .
COPY ./server .
RUN npm install && npm install -D @nestjs/serve-static

COPY --from=react /server/build client
CMD [ "npm", "run", "start" ]

FROM nestjs as development
CMD [ "npm", "run", "start:dev" ]

FROM nestjs as production
RUN npm run build
CMD [ "node", "dist/main.js" ]
