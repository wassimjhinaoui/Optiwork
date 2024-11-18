FROM node:18

WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm install -g prisma

EXPOSE 3000
CMD npm run dev