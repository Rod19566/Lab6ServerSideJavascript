FROM node:21.6.2-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

CMD [ "npm", "start" ]