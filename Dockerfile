FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE $PORT

# RUN npm run build

CMD ["npm", "run", "start:migrate"]