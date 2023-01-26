FROM node:19-alpine

WORKDIR /nestjs-server
COPY ./config/nestjs .
ENV NODE_ENV development
RUN npm install

CMD [ "npm", "run", "start:dev" ]