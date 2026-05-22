FROM node:alpine:3.18
WORKDIR /app
COPY package*json ./
RUN npm install && npm cache clean --force
EXPOSE 30001
COPY . .
CMD [ "npm install", "npm run start:dev" ]