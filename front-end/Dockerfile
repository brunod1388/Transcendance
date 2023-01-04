FROM node:19-alpine
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY config .
# COPY src src/
COPY public public/

RUN  npm install

CMD [ "npm", "start" ]
