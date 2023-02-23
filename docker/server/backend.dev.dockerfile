FROM node:19-alpine

WORKDIR /nestjs-server
COPY ./server/.eslintrc.js ./server/.prettierrc  ./server/nest-cli.json ./server/package.json ./server/tsconfig.build.json ./server/tsconfig.json ./
ENV NODE_ENV development
RUN npm install

CMD [ "npm", "run", "start:dev" ]