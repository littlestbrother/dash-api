FROM node:18.0-alpine AS builder

LABEL maintainer="aaron@sparrow-sw.dev"

ARG SSH_KEY
ARG PORT=8888
ENV PORT=${PORT}

RUN apk update && apk upgrade && apk add --update --no-cache git openssh curl bash

RUN mkdir -p -m 0600 ~/.ssh && echo "$SSH_KEY" > ~/.ssh/id_rsa && chmod -R 600 ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts
RUN git config --global url."git@github.com:".insteadOf "https://github.com/"

# Create app directory
WORKDIR /usr/app

# Copy over lock files
COPY package.json ./
COPY yarn.lock ./

# Install dependencies for the app
RUN yarn install

RUN rm -rf ~/.ssh/

EXPOSE $PORT

HEALTHCHECK --timeout=10s CMD curl -f http://localhost:$PORT/api/_health || exit 1

CMD [ "yarn", "start:development" ]