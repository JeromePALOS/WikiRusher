const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: [process.env.FRONT_BASE_URL, "http://localhost:42002"],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const db = require("./app/models");
//db.sequelize.sync();

//In Development
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
    return db.categorys.bulkCreate([{
        "id": 1,
        "name": "Popular",
        "lang": "fr",
        "parent": "-- Popular",
        "actif": true,
        "createdAt": "2021-02-05T12:26:49.000Z",
        "updatedAt": "2021-02-05T12:26:49.000Z"
    },
    {
        "id": 27,
        "name": "Arts",
        "lang": "fr",
        "parent": "Arts et culture",
        "actif": true,
        "createdAt": "2021-02-05T12:31:51.000Z",
        "updatedAt": "2021-02-05T12:31:51.000Z"
    },
    {
        "id": 28,
        "name": "Culture",
        "lang": "fr",
        "parent": "Arts et culture",
        "actif": true,
        "createdAt": "2021-02-05T12:31:56.000Z",
        "updatedAt": "2021-02-05T12:31:56.000Z"
    },
    {
        "id": 29,
        "name": "Littérature",
        "lang": "fr",
        "parent": "Arts et culture",
        "actif": true,
        "createdAt": "2021-02-05T12:32:01.000Z",
        "updatedAt": "2021-02-05T12:32:01.000Z"
    },
    {
        "id": 30,
        "name": "Mode",
        "lang": "fr",
        "parent": "Arts et culture",
        "actif": true,
        "createdAt": "2021-02-05T12:32:05.000Z",
        "updatedAt": "2021-02-05T12:32:05.000Z"
    },
    {
        "id": 31,
        "name": "Comics",
        "lang": "fr",
        "parent": "Arts et culture",
        "actif": true,
        "createdAt": "2021-02-05T12:32:09.000Z",
        "updatedAt": "2021-02-05T12:32:09.000Z"
    },
    {
        "id": 32,
        "name": "Bande dessinée",
        "lang": "fr",
        "parent": "Arts et culture",
        "actif": true,
        "createdAt": "2021-02-05T12:32:15.000Z",
        "updatedAt": "2021-02-05T12:32:15.000Z"
    },
    {
        "id": 33,
        "name": "Cinéma",
        "lang": "fr",
        "parent": "Audiovisuel",
        "actif": true,
        "createdAt": "2021-02-05T12:32:56.000Z",
        "updatedAt": "2021-02-05T12:32:56.000Z"
    },
    {
        "id": 34,
        "name": "Séries télévisées",
        "lang": "fr",
        "parent": "Audiovisuel",
        "actif": true,
        "createdAt": "2021-02-05T12:33:10.000Z",
        "updatedAt": "2021-02-05T12:33:10.000Z"
    },
    {
        "id": 35,
        "name": "Télévision",
        "lang": "fr",
        "parent": "Audiovisuel",
        "actif": true,
        "createdAt": "2021-02-05T12:33:15.000Z",
        "updatedAt": "2021-02-05T12:33:15.000Z"
    },
    {
        "id": 36,
        "name": "Disney",
        "lang": "fr",
        "parent": "Audiovisuel",
        "actif": true,
        "createdAt": "2021-02-05T12:33:21.000Z",
        "updatedAt": "2021-02-05T12:33:21.000Z"
    },
    {
        "id": 37,
        "name": "Star Wars",
        "lang": "fr",
        "parent": "Audiovisuel",
        "actif": true,
        "createdAt": "2021-02-05T12:33:25.000Z",
        "updatedAt": "2021-02-05T12:33:25.000Z"
    },
    {
        "id": 38,
        "name": "Terre du Milieu",
        "lang": "fr",
        "parent": "Audiovisuel",
        "actif": true,
        "createdAt": "2021-02-05T12:33:30.000Z",
        "updatedAt": "2021-02-05T12:33:30.000Z"
    },
    {
        "id": 39,
        "name": "Harry Potter",
        "lang": "fr",
        "parent": "Audiovisuel",
        "actif": true,
        "createdAt": "2021-02-05T12:33:37.000Z",
        "updatedAt": "2021-02-05T12:33:37.000Z"
    },
    {
        "id": 5,
        "name": "Géographie",
        "lang": "fr",
        "parent": "Géographie",
        "actif": true,
        "createdAt": "2021-02-05T12:27:33.000Z",
        "updatedAt": "2021-02-05T12:27:33.000Z"
    },
    {
        "id": 6,
        "name": "Villes du monde",
        "lang": "fr",
        "parent": "Géographie",
        "actif": true,
        "createdAt": "2021-02-05T12:27:39.000Z",
        "updatedAt": "2021-02-05T12:27:39.000Z"
    },
    {
        "id": 7,
        "name": "France",
        "lang": "fr",
        "parent": "Géographie",
        "actif": true,
        "createdAt": "2021-02-05T12:27:44.000Z",
        "updatedAt": "2021-02-05T12:27:44.000Z"
    },
    {
        "id": 2,
        "name": "Histoire",
        "lang": "fr",
        "parent": "Histoire",
        "actif": true,
        "createdAt": "2021-02-05T12:26:56.000Z",
        "updatedAt": "2021-02-05T12:26:56.000Z"
    },
    {
        "id": 3,
        "name": "Moyen Âge",
        "lang": "fr",
        "parent": "Histoire",
        "actif": true,
        "createdAt": "2021-02-05T12:27:13.000Z",
        "updatedAt": "2021-02-05T12:27:13.000Z"
    },
    {
        "id": 4,
        "name": "Monuments historiques",
        "lang": "fr",
        "parent": "Histoire",
        "actif": true,
        "createdAt": "2021-02-05T12:27:19.000Z",
        "updatedAt": "2021-02-05T12:27:19.000Z"
    },
    {
        "id": 40,
        "name": "Jeux",
        "lang": "fr",
        "parent": "Jeux",
        "actif": true,
        "createdAt": "2021-02-05T12:33:58.000Z",
        "updatedAt": "2021-02-05T12:33:58.000Z"
    },
    {
        "id": 41,
        "name": "Jeu vidéo",
        "lang": "fr",
        "parent": "Jeux",
        "actif": true,
        "createdAt": "2021-02-05T12:34:35.000Z",
        "updatedAt": "2021-02-05T12:34:35.000Z"
    },
    {
        "id": 42,
        "name": "Nintendo",
        "lang": "fr",
        "parent": "Jeux",
        "actif": true,
        "createdAt": "2021-02-05T12:34:43.000Z",
        "updatedAt": "2021-02-05T12:34:43.000Z"
    },
    {
        "id": 24,
        "name": "Musique",
        "lang": "fr",
        "parent": "Musique",
        "actif": true,
        "createdAt": "2021-02-05T12:29:55.000Z",
        "updatedAt": "2021-02-05T12:29:55.000Z"
    },
    {
        "id": 25,
        "name": "Rock",
        "lang": "fr",
        "parent": "Musique",
        "actif": true,
        "createdAt": "2021-02-05T12:30:00.000Z",
        "updatedAt": "2021-02-05T12:30:00.000Z"
    },
    {
        "id": 26,
        "name": "Metal",
        "lang": "fr",
        "parent": "Musique",
        "actif": true,
        "createdAt": "2021-02-05T12:30:05.000Z",
        "updatedAt": "2021-02-05T12:30:05.000Z"
    },
    {
        "id": 8,
        "name": "Sciences",
        "lang": "fr",
        "parent": "Sciences",
        "actif": true,
        "createdAt": "2021-02-05T12:27:53.000Z",
        "updatedAt": "2021-02-05T12:27:53.000Z"
    },
    {
        "id": 9,
        "name": "Astronomie",
        "lang": "fr",
        "parent": "Sciences",
        "actif": true,
        "createdAt": "2021-02-05T12:27:59.000Z",
        "updatedAt": "2021-02-05T12:27:59.000Z"
    },
    {
        "id": 10,
        "name": "Sciences de la Terre et de l'Univers",
        "lang": "fr",
        "parent": "Sciences",
        "actif": true,
        "createdAt": "2021-02-05T12:28:05.000Z",
        "updatedAt": "2021-02-05T12:28:05.000Z"
    },
    {
        "id": 11,
        "name": "Chimie",
        "lang": "fr",
        "parent": "Sciences",
        "actif": true,
        "createdAt": "2021-02-05T12:28:12.000Z",
        "updatedAt": "2021-02-05T12:28:12.000Z"
    },
    {
        "id": 12,
        "name": "Physique",
        "lang": "fr",
        "parent": "Sciences",
        "actif": true,
        "createdAt": "2021-02-05T12:28:19.000Z",
        "updatedAt": "2021-02-05T12:28:19.000Z"
    },
    {
        "id": 13,
        "name": "Mathématiques",
        "lang": "fr",
        "parent": "Sciences",
        "actif": true,
        "createdAt": "2021-02-05T12:28:24.000Z",
        "updatedAt": "2021-02-05T12:28:24.000Z"
    },
    {
        "id": 14,
        "name": "Sport",
        "lang": "fr",
        "parent": "Sport",
        "actif": true,
        "createdAt": "2021-02-05T12:28:34.000Z",
        "updatedAt": "2021-02-05T12:28:34.000Z"
    },
    {
        "id": 15,
        "name": "Football",
        "lang": "fr",
        "parent": "Sport",
        "actif": true,
        "createdAt": "2021-02-05T12:28:39.000Z",
        "updatedAt": "2021-02-05T12:28:39.000Z"
    },
    {
        "id": 16,
        "name": "Tennis",
        "lang": "fr",
        "parent": "Sport",
        "actif": true,
        "createdAt": "2021-02-05T12:28:46.000Z",
        "updatedAt": "2021-02-05T12:28:46.000Z"
    },
    {
        "id": 17,
        "name": "Sport automobile",
        "lang": "fr",
        "parent": "Sport",
        "actif": true,
        "createdAt": "2021-02-05T12:28:51.000Z",
        "updatedAt": "2021-02-05T12:28:51.000Z"
    },
    {
        "id": 18,
        "name": "Sport motocycliste",
        "lang": "fr",
        "parent": "Sport",
        "actif": true,
        "createdAt": "2021-02-05T12:28:59.000Z",
        "updatedAt": "2021-02-05T12:28:59.000Z"
    },
    {
        "id": 19,
        "name": "Technologies",
        "lang": "fr",
        "parent": "Technologies",
        "actif": true,
        "createdAt": "2021-02-05T12:29:13.000Z",
        "updatedAt": "2021-02-05T12:29:13.000Z"
    },
    {
        "id": 20,
        "name": "Informatique",
        "lang": "fr",
        "parent": "Technologies",
        "actif": true,
        "createdAt": "2021-02-05T12:29:21.000Z",
        "updatedAt": "2021-02-05T12:29:21.000Z"
    },
    {
        "id": 21,
        "name": "Transports",
        "lang": "fr",
        "parent": "Transports",
        "actif": true,
        "createdAt": "2021-02-05T12:29:35.000Z",
        "updatedAt": "2021-02-05T12:29:35.000Z"
    },
    {
        "id": 22,
        "name": "Automobile",
        "lang": "fr",
        "parent": "Transports",
        "actif": true,
        "createdAt": "2021-02-05T12:29:40.000Z",
        "updatedAt": "2021-02-05T12:29:40.000Z"
    },
    {
        "id": 23,
        "name": "Chemin de fer",
        "lang": "fr",
        "parent": "Transports",
        "actif": true,
        "createdAt": "2021-02-05T12:29:47.000Z",
        "updatedAt": "2021-02-05T12:29:47.000Z"
    }]);
  });








// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to wiki application." });
});

require("./app/routes/room.routes")(app);
require("./app/routes/userRoom.routes")(app);
require("./app/routes/roomCategory.routes")(app);
require("./app/routes/category.routes")(app);
require("./app/routes/pageWiki.routes")(app);
require("./app/routes/roomPageWiki.routes")(app);



// set port, listen for requests
const PORT = process.env.PORT || 8080;
var server = app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});


const fetch = require("node-fetch");
const io = require('socket.io')(server,{
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});

const Room = db.rooms;
const UserRoom = db.userRooms;
const PageWiki = db.pageWikis;
const RoomPageWiki = db.roomPageWikis;
io.on('connection', function(socket){
	socket.on('join_room', function(data){
		socket.uidRoom = data['uidRoom'];
		socket.username = data['username'];

		Room.findOne({where: {uid: socket.uidRoom}}).then(r => {
			socket.idRoom = r.id;
			
			
			UserRoom.findAll({where: {
				roomId: r.id,
				username: data['username']
			}}).then(UrAll => {
				if(UrAll.length <= 0){ //if username not exist
					socket.join(socket.uidRoom);
					UserRoom.findAll({where: {
						roomId: r.id,
						host: 1
					}}).then(UrAllHost => {
						if(UrAllHost.length <= 0){ //if not host
							var host = 1;
						}else{
							var host = 0;
						}
						
						var userRoom = {
							roomId:  r.id,
							username: data['username'],
							idSocket: socket.id,
							point: 0,
							host: host,
							found: false
						};
						UserRoom.create(userRoom).then(data => {
							refreshListPlayer(r);
						}).catch(err => {
							socket.emit('message', 'Error join room');
						}); 
						
					});
				}
			});
		});
	});	
	
	socket.on('start_room', function(){
		console.log('Error extract');
		Room.findOne({where: {uid: socket.uidRoom}}).then(r => {
			UserRoom.findOne({where: {
				host: 1, 
				username: socket.username,
				roomId: r.id,
				idSocket: socket.id
			}}).then(Ur => {
				//If he is host
				if(Ur == null || Ur == undefined || Ur.length <= 0){
					socket.emit('message', 'You are not the host');
				}else if(r.countQuestion !== 0){
					socket.emit('message', 'The game is in progress (question ' + r.countQuestion + '/' + r.maxQuestion + ')');
				}else{
					Room.update(
						{countQuestion: 0, currentPage:0},
						{where: { uid: socket.uidRoom }}
					);
				
					RoomPageWiki.destroy({
						where: { 
						  roomId: r.id 
						},
					});
					UserRoom.update(
						{point: 0},
						{where: { roomId: r.id }}
					);
					io.in(socket.uidRoom).emit('start_room', 'Start this room');
					refreshListPlayer(r);
					setTimeout(function(){nextQuestion();}, 3000);
				}
			});
			
		});
	});
	socket.on('next_question', function(){
		setTimeout(function(){nextQuestion();}, 3000);
		
	});
	socket.on('send_reponse', function(pageid, title){
		Room.findOne({where: {uid: socket.uidRoom}}).then(r => {
			if(r.currentPage == pageid){
				UserRoom.findOne({where: {
					username: socket.username,
					roomId: r.id,
					found: 0,
					idSocket: socket.id
				}}).then(Ur => {
					UserRoom.findAll({where: {
						roomId: r.id,
						found: 1
					}}).then(other => {
						if(other == null || other == undefined || other.length <= 0){
							var po = 2;
						}else{
							var po = 1;
						}
						UserRoom.update(
							{point: Ur.point + po, found: 1},
							{where: { idSocket: socket.id }}
						).then(num => {			
								socket.emit('send_reponse_success', 'GG ! +'+po+' point');
								socket.broadcast.to(socket.uidRoom).emit("other_reponse_success");
								refreshListPlayer(r);
						 });
					});
				});
				
				
			}else{
				socket.emit('send_reponse_fail', 'Nope');
			}
		});
	});
	socket.on('update_room', function(){
		io.in(socket.uidRoom).emit("update_room");
	});
	function nextQuestion() {
		socket.boucleQuestion = 0;
		Room.findOne({
			where: {uid: socket.uidRoom},
			include: [{
				model: db.roomCategorys,
				as: "roomCategorys",
				include: [{
					model: db.categorys,
					as: "category",
					required: false
				}]
			}]
		}).then(roomEntite => {
			if (roomEntite.countQuestion >= roomEntite.maxQuestion){
				refreshListPlayer(roomEntite);
				endRoom();
			}else{
				nextQuestion2(roomEntite);
			}
		});
	}
	async function nextQuestion2(roomEntite) {
		
		UserRoom.update({
			found:  0,
		},{
			where: { roomId: roomEntite.id}
		}).then(UrUpdate => {
			refreshListPlayer(roomEntite);
		});
;

		var lang = roomEntite.lang;

		var rdmCat = Math.floor(Math.random() * Math.floor(roomEntite.roomCategorys.length));
		var roomCat = roomEntite.roomCategorys[rdmCat];
		
		if(roomCat.category.id == 1){
			if(roomCat.difficulty == 4){
				var random = Math.floor(Math.random() * Math.floor(999));
			}else if(roomCat.difficulty == 3){
				var random = Math.floor(Math.random() * Math.floor(500));
			}else if(roomCat.difficulty == 2){
				var random = Math.floor(Math.random() * Math.floor(200));
			}
				
			var endpoint = `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&prop=info%7Cextracts&indexpageids=1&generator=mostviewed&utf8=1&gpvimlimit=1&gpvimoffset=${random}`;	
			nextQuestion3(roomEntite, endpoint);
		}else{
			PageWiki.findAll({
				where: {
					categoryId: roomCat.category.id,
					difficulty: roomCat.difficulty
				},
			}).then(PageWiki => {
				var random = Math.floor(Math.random() * Math.floor(PageWiki.length));
				var pageID = PageWiki[random].pageWikiId;
				var endpoint = `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&prop=description%7Cextracts&list=&indexpageids=1&utf8=1&pageids=${pageID}`;	
				nextQuestion3(roomEntite, endpoint);
			});
		}
	}	
	async function nextQuestion3(roomEntite, endpoint) {	

		var json = await apiWiki(endpoint);

		if(
			json == undefined && 
			json.query == undefined && 
			json.query.pageids[0] == undefined &&
			json.query.pages[json.query.pageids[0]].extract == undefined
		){	
			console.log('Error extract');
			nextQuestion2(roomEntite);
			return false;	
		}				
		
		RoomPageWiki.findAll({
			where: {
				pageWikiId: json.query.pageids[0],
				roomId: roomEntite.id,
			},
		}).then(roomPageWiki => {
			if(roomPageWiki.length <= 0 || socket.boucleQuestion >= 5){
				nextQuestion4(roomEntite, json);
			}else{
				socket.boucleQuestion += 1;
				nextQuestion2(roomEntite);
				console.log('Error double question');
				return false;	
			}
		});
	}	
	async function nextQuestion4(roomEntite, json) {
		io.in(socket.uidRoom ).emit('message', 'Next Question');
		var idPage = json.query.pageids[0];
		var extract = json.query.pages[idPage].extract;
		socket.idPage = idPage;		
		console.log('Page Wiki :' + json.query.pages[idPage].title);

		Room.update({
			countQuestion:  roomEntite.countQuestion + 1,
			currentPage: idPage,
		},{
			where: { uid: socket.uidRoom}
		});
		RoomPageWiki.create({
			pageWikiId: idPage,
			roomId: roomEntite.id,
		});

		var i = 0;
		if(extract != undefined && extract.length >= 5000){
			extract = extract.substring(0, 3000);
		}
		
		while(extract.indexOf('<b') != -1 && extract.indexOf('</b>') != -1 && i < 20){
			extract = replaceExtract(extract, '<b', '</b>');
			i++;
		}		
		while(extract.indexOf('<small') != -1 && extract.indexOf('</small>') != -1 && i < 30){
			extract = replaceExtract(extract, '<small', '</small>');
			i++;
		}
		while(extract.indexOf('<span') != -1  && extract.indexOf('</span>') != -1 && i < 40){
			extract = replaceExtract(extract, '<span', '</span>');
			i++;
		}		
		while(extract.indexOf(json.query.pages[idPage].title.toLowerCase()) != -1 && i < 100){
			extract = extract.replace(json.query.pages[idPage].title.toLowerCase(), '[...]');
			console.log('title:' + json.query.pages[idPage].title);
			i++;
		}

		if(json.query.pages[idPage].title.indexOf('(') != -1 && json.query.pages[idPage].title.indexOf('(') > 3){
			
			let titlemini = json.query.pages[idPage].title.substring(0, json.query.pages[idPage].title.indexOf('(')-1);
			while(extract.indexOf(titlemini) != -1 && i < 130){
				extract = extract.replace(titlemini, '[...2]');
				i++;
				console.log('titlemini:' + titlemini);
			}
			while(extract.indexOf(titlemini.toLowerCase()) != -1 && i < 150){
				extract = extract.replace(titlemini.toLowerCase(), '[...2]');
				i++;
			}

		}
		while(extract.indexOf('[...][...]') != -1 && i < 180){
			console.log('[...][...]');
			extract = extract.replace('[...][...]', '[...]');
			i++;
		}
			 
		extract += ' [...]';
		
		var extract = extract.replace(/<[^>]*>?/gm, '');
		io.in(socket.uidRoom ).emit('next_question', extract);
		chrono(idPage, roomEntite);
		
		
	}
	function replaceExtract(extract, start, end){
		var startCara = extract.indexOf(start);
		var endCara = (extract.indexOf(end)+(end.length));
		
		//regle pb span in span
		for(let i = 2; endCara <= startCara && i<= 7 && extract.indexOf(end, i) != -1; i++){
			endCara = (extract.indexOf(end, i)+(end.length));
		}
		if(endCara >= startCara){
			let rep = extract.substring(startCara, endCara);
			console.log(rep);
			return extract.replace(rep, '[...]');
		}else{
			return extract;
		}
	}
	function chrono(idPage, room) {	
		return setTimeout(function(){
			io.in(socket.uidRoom ).emit('chrono');
			chrono2(idPage, room);
		}, room.responseTime*1000 - 10000);
	}
	function chrono2(idPage, room){	
		return setTimeout(function(){
			endQuestion(idPage, room);
		}, 10000);
	}
	
	async function endQuestion(idPage, room){
		Room.update(
			{currentPage:0},
			{where: { uid: socket.uidRoom }}
		);
		const endpoint = `https://${room.lang}.wikipedia.org/w/api.php?action=query&format=json&prop=description&list=&indexpageids=1&pageids=${idPage}`;
		var json = await apiWiki(endpoint);
		var idPage = json.query.pageids[0];
		
		const endpoint2 = `https://${room.lang}.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages&pageids=${idPage}&pithumbsize=300`;
		var json_img = await apiWiki(endpoint2);
		
		if(json_img.query.pages[idPage].thumbnail !== undefined){
			var data = { 
				title: json.query.pages[idPage].title,
				source: json_img.query.pages[idPage].thumbnail.source,
				width: json_img.query.pages[idPage].thumbnail.width,
				height: json_img.query.pages[idPage].thumbnail.height,
			};
		}else{
			var data = {
				title: json.query.pages[idPage].title
			};
		}

		io.in(socket.uidRoom ).emit('send_reponse_reveal', data);
		setTimeout(function(){
			nextQuestion();	
		}, 5000);
		
	}
	function endRoom(){
		io.in(socket.uidRoom ).emit('end_room');
		Room.update(
			{countQuestion: 0, currentPage:0},
			{where: { uid: socket.uidRoom }}
		);
		io.in(socket.uidRoom ).emit('message', 'ENNNNNNNNNNND');
	
	}
	async function apiWiki(endpoint){

		const response = await fetch(endpoint);
		if (!response.ok) {
			throw Error(response.statusText);
		}
		const json = await response.json();	
		if(json.query == undefined){
				console.log('fffffffffffnope');
		}
		return json;
		
	}
	function refreshListPlayer(room){
		UserRoom.findAll({
			where: { roomId: room.id }
		}).then(Ur => {	
			io.in(socket.uidRoom).emit('refresh_list_player', Ur);
			return true;
		}).catch(err => {
			return false;
		}); 
	}	
	socket.on('listPlayer', function(){
		Room.findOne({where: {uid: socket.uidRoom}}).then(r => {
			refreshListPlayer(r);
		});
	});
	
	socket.on('message', function(msg) {
		io.emit('message', msg)
	});
	socket.on('disconnect', () => {
	   console.log('DISCONNECTED');
	});
});


//require('./socket.io.js');
