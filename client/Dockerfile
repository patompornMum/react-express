FROM node:18.16.0-alpine

WORKDIR /usr/app

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

RUN npm run build

# CMD ["npx","serve","dist"]
CMD ["npm","run","preview"]