FROM node:19-alpine as base

FROM base as react
WORKDIR /react-app
COPY ./config/react .
RUN npm install

FROM react as nestjs
WORKDIR /nestjs-server
COPY ./config/nestjs .
RUN npm install && npm install -D @nestjs/serve-static

FROM nestjs as developpment
CMD [ "npm", "run", "server-start:dev" ]