
FROM node:10 as build-stage
WORKDIR /app
COPY ./package*.json .
RUN npm install 
COPY . .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app/
COPY ./nginx-wikirusher.conf /etc/nginx/nginx.conf

EXPOSE 8081





