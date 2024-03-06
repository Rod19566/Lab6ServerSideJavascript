# Use the official Node.js image as the base image
#FROM node:16.14.0-alpine 
FROM node:21.6.2-alpine
RUN apk update && apk add git

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Clear npm cache
RUN npm cache clean --force

# Install dependencies
RUN npm install

# Copy the application files
COPY . .

CMD [ "npm", "start" ]