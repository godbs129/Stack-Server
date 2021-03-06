FROM node:12

WORKDIR /usr/src/stack

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD [ "node", "src/server.js" ]