FROM node:19-alpine

WORKDIR /react-app
ENV NODE_ENV development
COPY ./react-app/.prettierrc ./react-app/package.json ./react-app/tsconfig.json ./

RUN npm install

CMD [ "npm", "start" ]