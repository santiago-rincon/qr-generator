FROM node:20-alpine3.19 as build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build:docker

FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx/default.conf  /etc/nginx/conf.d/default.conf