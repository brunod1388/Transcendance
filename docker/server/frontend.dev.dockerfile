FROM node:19-alpine

WORKDIR /react-app
ENV NODE_ENV development
COPY ./config/react .

RUN npm install

CMD [ "npm", "start" ]