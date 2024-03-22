FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

EXPOSE $PORT

CMD ["npm", "run", "start:migrate"]