FROM node:20
WORKDIR /gestion_usuario
COPY package*.json ./
COPY . .
RUN npm install
CMD ["node", "src/index.js"]
EXPOSE 4006