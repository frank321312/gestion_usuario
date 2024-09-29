FROM node:20
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm install
CMD ["npm", "start"]
EXPOSE 4006