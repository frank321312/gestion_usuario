FROM node:20
WORKDIR /home/hsacaca/gestion_usuario
COPY package*.json ./
COPY . .
RUN npm config set registry https://registry.npmjs.org/
RUN npm config set fetch-retries 10
RUN npm config set fetch-retry-mintimeout 120000
RUN npm config set fetch-retry-maxtimeout 300000
RUN npm install
CMD ["npm", "start"]
EXPOSE 4006