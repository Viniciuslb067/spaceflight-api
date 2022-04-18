FROM node:lts-alpine3.13

WORKDIR /usr/app

COPY package.json .

RUN npm install

COPY . .

RUN npm run prisma:generate

EXPOSE 3008
CMD npm run dev