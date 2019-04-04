FROM node:11

WORKDIR /usr/movie-rental

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]