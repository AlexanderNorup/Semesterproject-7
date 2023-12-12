FROM node:21-alpine as build

COPY . .
RUN npm build

EXPOSE 3000
ENTRYPOINT [ "npm run start" ]
