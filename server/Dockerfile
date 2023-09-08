FROM node:18.16.0-alpine

WORKDIR /usr/app

COPY ./package*.json ./

RUN npm install

# RUN npm uninstall bcrypt

# RUN npm install bcrypt

COPY . .

EXPOSE 3000

CMD ["npm","run","start"]