FROM node:18-alpine AS builder

ARG NODE_ENV=dev
ARG PORT=4200
ARG VERSION=1.0.0

ENV NODE_ENV=${NODE_ENV}

MAINTAINER "Essengogroup"

LABEL version=${VERSION}, name="nodejs", description="Nodejs image"

WORKDIR /app

COPY package*.json .
COPY . .

RUN npm install
RUN npm i -g @angular/cli@14.2.5

EXPOSE $PORT

CMD ["ng","serve","--host","0.0.0.0"]




