FROM node:19-alpine as base

FROM base as react
WORKDIR /react-app
COPY ./config/react .
RUN npm install

FROM react as nestjs
WORKDIR /nestjs-server
COPY ./config/nestjs .
RUN npm install

FROM nestjs as developpment
CMD [ "npm", "run", "server-start:dev" ]