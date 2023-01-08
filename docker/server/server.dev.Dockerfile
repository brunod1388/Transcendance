FROM node:19-alpine as base

FROM base as react
WORKDIR /react-app
ENV NODE_ENV development
COPY ./config/react .
RUN npm install
CMD [ "npm", "start" ]

FROM react as nestjs
WORKDIR /nestjs-server
ENV NODE_ENV development
COPY ./config/nestjs .
RUN npm install

FROM nestjs as development
CMD [ "npm", "run", "server-start:dev" ]