FROM node:14
WORKDIR /app
ENV NODE_ENV production

COPY package.json .
RUN npm install
COPY . .

ENV DB_HOST=localhost
ENV DB_USER=root
ENV DB_PASS=wikirusher774400
ENV DB_NAME=dbwikirusher
ENV DB_PORT=3006

EXPOSE 8080
CMD ["node", "server.js"]