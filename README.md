# Wiki Rusher

Game with api wikipedia


## Installation
```bash
git clone https://github.com/JeromePALOS/wikirusher.git

cd wikiguessr-server/ 
npm install
nodemon server.js

cd ..

cd wikiguessr-client/ 
npm install
npm run serve

```

http://localhost:8081

## Configuration
### Server
* app/config/db.config.js
* server.js -> origin

deploy code
* node server.js

### Client
* .env

deploy code
* npm run build
* nginx redirect /var/www/wikirusher-client/dist

## Docker Installation
```bash
git clone https://github.com/JeromePALOS/wikirusher.git
```

Change docker-compose.yml
Change wikirusher-client/.env


```bash
docker-compose rm -f && docker-compose up --build
```

If the categories are not displayed, restart the container server


## Chron

1 5 * * * curl -X DELETE wikirusher.com:8080/api/room/delete/all
* * * * * echo "Sauvegarde : $(date)" > /tmp/mybackup.log


