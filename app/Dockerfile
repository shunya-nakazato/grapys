FROM node:latest

RUN apt update

RUN mkdir /app
WORKDIR /app

COPY ./app/package.json .
RUN npm install --production

COPY ./app .

EXPOSE 3000