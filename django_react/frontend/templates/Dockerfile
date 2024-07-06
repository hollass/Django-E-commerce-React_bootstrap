FROM ubuntu:latest
LABEL authors="Vladimir"
FROM node:18-alpine as build
WORKDIR /usr/src/app
ADD *.json ./
RUN npm install

ADD ./public ./public
ADD ./src ./src
ENTRYPOINT ["top", "-b"]