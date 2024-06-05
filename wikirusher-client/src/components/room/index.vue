<template>
  <div v-if="currentRoom">
    <div class="panel-main" v-if="displayModule === 'question'">
      <div class="container mt-3" id="module-question" >
        <div class="chrono">
          <div class="screen"></div>
          <div class="number"></div>
        </div>
        <h4>
          Question <span>{{ countQuestion }}</span> sur <span :key="currentRoom.maxQuestion">{{ currentRoom.maxQuestion }}</span>
        </h4>
		
        <div v-if="revealData['title']" id="reveal">
          <p :key="revealData['title']">{{ revealData['title'] }}</p>
          <img v-if="revealData['source']"  :src="revealData['source']" />
        </div>
		
        <div  id="question" v-if="questionAff" :key="questionAff">
          {{ questionAff }}
        </div>

        
        <form class="bloc-reponse js-search-form" >
          <input type="text" id="js-search-input" class="js-search-input input-dark" autocomplete="off" placeholder="Find the Wikipedia page"/>
          <input type="submit" value="Search" class="input-dark" @click="handleSubmit" :disabled="found == 1"/>
        </form>
        
        <div class="propals">
          <a href="#" v-for="propal in propals" :key="propal.id" @click="sendReponse(propal.pageid, propal.title)">
            {{ propal.title }} <span> </span>
          </a>
        </div>
      </div>
    </div>
    
    
    
    
    
    
    
    
    <div class="container mt-3" id="module-room" v-else-if="displayModule === 'room'">
      <div style="text-align:center;">
          <h3 style="margin-bottom:40px;font-family: cursive;">Find the name of the wikipedia page where the text is extracted</h3>
      </div>
      <h4>
        Room information 
        <a v-if="host" class="btn btn-sm btn-outline-light" @click="displayEditRoom">
          <span class="icon-pencil"> </span>
        </a>
      </h4>
      <div class="link-uid">
        <label><strong>Uid:</strong></label> 
        <span id="uid">{{uid}}</span>
        <button class="btn btn-sm btn-outline-light" type="button" id="show-uid" @click="showUid($event)">show</button>
        
      </div>
      <div>
        <label><strong>Invite:</strong></label>
        <button class="btn btn-sm btn-outline-light" type="button" id="copy-uid" @click="copyUid">copy link</button>
        <input id="linkUid" style="opacity:0" type="text" :value="link" />
      
      </div>
      <div>
        <label><strong>Lang:</strong></label> {{ currentRoom.lang }}
      </div>
      <div>
        <label><strong>Max Question:</strong></label> {{ currentRoom.maxQuestion }}
      </div>
      
      <div>
        <label><strong>Response time:</strong></label> {{ currentRoom.responseTime }}s
      </div>
      <div>
        <label><strong>Private:</strong></label> {{ currentRoom.private ? "Private" : "Public" }}
      </div>

    
      <div style="text-align:center; margin-top: 80px;">
        <button v-if="host" @click="start" class="btn-start">Start a game</button>
        <p v-else>Waiting for the host...</p>
      </div>
    </div>  
      
    <div class="submit-form container mt-3" id="module-editroom" v-else-if="displayModule === 'editRoom'">
      <h4>Room</h4>
      <form>
        <div class="form-group">
          <label for="maxQuestion">Max Question</label>
          <input type="number" class="w-100 input-dark" id="maxQuestion"
            v-model="currentRoom.maxQuestion"
          />
        </div>
        <div class="form-group">
          <label for="lang">Lang</label>
          <select
            class="w-100 input-dark"
            id="lang"
            required
            v-model="currentRoom.lang"
            name="lang"
          >
              <option value="fr" selected="selected">fr</option>

          </select>
        </div>
        <div class="form-group">
          <label for="responseTime">Response time (second)</label>
          <input
            type="number"
            class="w-100 input-dark"
            id="responseTime"
            required
            v-model="currentRoom.responseTime"
            name="responseTime"
          />
        </div>

        <!--div class="form-group">
          <label><strong>Private:</strong>  </label>
          <input type="checkbox" name="private" v-model="currentRoom.private"/>
        </div-->
        
         <div class="form-group">
          <label>Category</label>
          <table class="listCategory ">
            <thead class="table-bordered border-ligth table-sm">
              <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Difficulty</th>
                  <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody class="table-bordered border-ligth table-sm">
              <tr v-for="(categorySelected, key) in listCategorySelected" :key="categorySelected.id" >
                <td>{{ categorySelected.name }}</td>
                <td>{{ categorySelected.fullDifficulty }}</td>
                <td><span class="btn btn-outline-light btn-sm" @click="deleteCategory(key)"><span class="icon-bin2"></span></span></td>
              </tr>

            </tbody>
            <tfoot>
             <tr>
                <td>
                <select class="input-perso" v-model="inputCategory.id">
                    <template v-for="(category, index) in listCategory" >
                      <option disabled="disabled" style="font-weight:700;background-color: grey;color: white;" v-if="listCategory[index-1] == undefined || category.parent != listCategory[index-1].parent" :key="`parent-${category.id}`">
                        {{ category.parent }}
                      </option>
                    
                      <option :value="category.id" :key="category.id">
                        {{ category.name }}
                      </option>
                    </template>
                  
                </select>
                 </td> 
                 <td> 
                  <select class="input-perso" v-model="inputCategory.difficulty">
                    <option v-for="difficulty in listDifficulty" :key="difficulty.id" :value="difficulty.id">
                      {{ difficulty.name }}
                    </option>
                  </select>
                </td> 
                <td>
                  <span class="btn btn-outline-light btn-sm" @click="addCategory"><span class="icon-plus"></span></span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </form>

      <button type="submit" class="w-100 input-dark" @click="updateRoom">
        Update
      </button>
      
      <button @click="displayRoom" style="margin-top: 15px" type="button" class="btn btn-sm btn-outline-light"><span class="icon-undo2"></span> Back</button>
    </div>   
      
      
      
    <div class="panel-second">
      <nav class="navbar navbar-dark">
        
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglePlayer" aria-controls="navbarTogglePlayer" aria-expanded="true" aria-label="Toggle navigation">
          <span class="icon-menu icon-users"></span>
        </button>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleCategory" aria-controls="navbarToggleCategory" aria-expanded="true" aria-label="Toggle navigation">
          <span class="icon-menu icon-file-text"></span>
        </button>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleParam" aria-controls="navbarToggleParam" aria-expanded="false" aria-label="Toggle navigation">
          <span class="icon-menu icon-equalizer"></span>
        </button>
        
      </nav>
      <div class="collapse menu-collapse" id="navbarToggleParam">
        <div class="bg-dark">
          <h4>
            <span class="icon-equalizer"></span> 
            Setting
            <span class="icon-equalizer"></span> 
          </h4>
          <ul>
            <li>
              <span class="icon-volume-high"></span>
              
              <input id="volume-control" @change="changeVolume($event)" type="range" min="0" max="100" value="50" />
            </li>
          </ul>
        </div>
      </div>
      <div class="collapse show menu-collapse" id="navbarToggleCategory">
        <div class="bg-dark">
          <h4>
            <span class="icon-file-text"></span> 
            Category
            <span class="icon-file-text"></span> 
          </h4>
          <ul>
              <li v-for="(roomCategory) in currentRoom.roomCategorys" :key="roomCategory.id" >
                {{ roomCategory.category.name }} 
                <span v-if="roomCategory.difficulty == 2">(Easy)</span>
                <span v-else-if="roomCategory.difficulty == 3">(Medium)</span>
                <span v-else-if="roomCategory.difficulty == 4">(Hard)</span>
              </li>
          </ul>
        </div>
      </div>
      <div class="collapse show menu-collapse" id="navbarTogglePlayer">
        <div class="bg-dark">
          <h4>
            <span class="icon-users"></span> 
            List Player
            <span class="icon-users"></span> 
          </h4>
          <ul>
            <li v-for="player in listPlayer" :key="player.id" :class="[(player.username == username)?'player-me':'']">
              <span :class="{ 'playerfound' : player.found==1 }">{{ player.point }}</span>
              {{ player.username }}
              <span v-if="player.host" class="icon-spades"></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
  </div>
  
  
  
</template>

<script>

import io from 'socket.io-client';
import RoomDataService from "../../services/RoomDataService";
import UserRoomDataService from "../../services/UserRoomDataService";
import CategoryDataService from "../../services/CategoryDataService";




export default {
  name: "question",
  data() {
    return {
      currentRoom: null,
      uid: null,
      host: 0,
      username: sessionStorage.getItem('username'),
      message: '',
      socket : null,
      timeOut : '',
      timeQuestion: 100,
      numberCara: 5,
      questionAff: 'Start in 3 secondes',
      blocQuestion: '',
      propals:[],
      countQuestion: 0,
      revealData: {},
      question: {},
      listPlayer: {},
      found: 0,
      displayModule: "room",
      myAudio: null,
      listCategorySelected: [
        
      ],
      listCategory: {},
      inputCategory: {
        id: 2,
        difficulty: 2
      },
      listDifficulty: [
        {id: 2, name: "Easy"},
        {id: 3, name: "Medium"},
        {id: 4, name: "Hard"},
      ],
      link: "",
    };
  },
  methods: {
    getRoomUid(uid) {
      RoomDataService.findOneByUid(uid).then(response => {
        
        this.currentRoom = response.data;
         this.listUserRoom();
         this.link = process.env.VUE_APP_ROOT_FRONT_BASE_URL + '/room/join?uid=' + this.currentRoom.uid; 
      }).catch(e => {
        console.log(e);
        alert('Room not found');
        this.$router.push('/');
      });
    },
    
    listUserRoom(){
      UserRoomDataService.findByRoom(this.currentRoom.id)
        .then(response => {
          
          this.listPlayer = response.data;
          for(let i = 0; i < response.data.length; i++){
            if(response.data[i].host == 1 && response.data[i].username == sessionStorage.getItem('username')){
              this.host = response.data[i].username;
            }
          }
          this.submitted = true;
        }).catch(e => {
          console.log(e);
        });  
    },
    updateRoom() {
      var data = {
        room: this.currentRoom,
        listCategory: this.listCategorySelected,
        idSocket: this.socket.id
      };
      
      RoomDataService.update(this.currentRoom.id, data)
        .then(response => {
          this.displayRoom();
          console.log(response);
          this.socket.emit('update_room');
        })
        .catch(e => {
          console.log(e);
        });
    },   
    deleteCategory(key){
      this.listCategorySelected.splice(key, 1);
    },
    addCategory(){
      this.listCategorySelected.push({
        difficulty: this.inputCategory.difficulty,
        id: this.inputCategory.id,
        name: this.listCategory.find(list => list.id == this.inputCategory.id).name,
        fullDifficulty: this.listDifficulty.find(list => list.id == this.inputCategory.difficulty).name
      });

    },
    affichageQuestion(){ 

      this.questionAff = this.question.substr(0, this.numberCara);
      this.numberCara += 1;

      if(this.numberCara > 100 && this.numberCara < 300){
        this.timeQuestion = 90;
      }else if(this.numberCara >= 300 && this.numberCara < 800){
        this.timeQuestion = 80;
      }else if(this.numberCara >= 800 && this.timeQuestion > 35){
        this.timeQuestion = 40;
      }

      if(this.numberCara <= this.question.length){
        this.timeOut = setTimeout(() => {this.affichageQuestion()}, this.timeQuestion);
      }   
    },
    eventSocket(){
      this.socket.on('message', function(msg){
        this.flash(msg, 'warning', {timeout: 3000});
      }.bind(this));
      
      this.socket.on('refresh_list_player', function(data){
        this.listPlayer = data;
        for(let i = 0; i < data.length; i++){
          if(data[i].host == 1 && data[i].username == sessionStorage.getItem('username')){
            this.host = data[i].username;
          }
        }
      }.bind(this));
      
      this.socket.on('next_question', function(data){
        clearTimeout(this.timeOut);
	
        document.getElementById('js-search-input').value = "";
        document.getElementById('js-search-input').focus();

        this.propals = {};
        this.revealData = {};
        this.timeQuestion = 150;
        this.numberCara = 5;
        this.question = data;
        this.countQuestion += 1;
        this.found = 0;
        this.affichageQuestion();

      }.bind(this));
      
      this.socket.on('chrono', function(){
        var the_div = document.getElementsByClassName("screen")[0];
        the_div.className = "screen";
        window.requestAnimationFrame(function() {
          window.requestAnimationFrame(function() {
            the_div.className = "screen animation-chrono";
          });
        });
      }.bind(this));
      
      this.socket.on('send_reponse_fail', function(msg){
        this.flash(msg, 'error', {timeout: 1000});
        this.playReponseFalse();
      }.bind(this));
      
      this.socket.on('send_reponse_success', function(msg){
        this.found = 1;
        this.propals = {0: {title: "GG ! It was the right answer !", pageid: 0}};
        this.flash(msg, 'success', {timeout: 3000});
        this.playReponseTrue();
      }.bind(this));
      
      this.socket.on('other_reponse_success', function(){
        this.playOtherReponseTrue();
      }.bind(this));
      
      this.socket.on('send_reponse_reveal', function(data){
        clearTimeout(this.timeOut);
        this.revealData = data;
        this.questionAff = "";
      }.bind(this));
      
      this.socket.on('update_room', function(){
        this.getRoomUid(this.currentRoom.uid);
        
      }.bind(this));
      
      this.socket.on('end_room', function(){
        //window.location.href = '/room/join?uid=' + this.currentRoom.uid;
        this.displayRoom();
      }.bind(this));
      
      this.socket.on('start_room', function(msg){
        this.flash(msg, 'warning', {timeout: 3000});
        this.countQuestion = 0;
        this.displayQuestion();
        this.getRoomUid(this.currentRoom.uid);
      }.bind(this));
      
		
    },
    async handleSubmit(event) {
      event.preventDefault();
      const inputValue = document.querySelector('.js-search-input').value;
      const searchQuery = inputValue.trim();

      try {
          const results = await this.searchWikipedia(searchQuery);
          this.displayResults(results);
      } catch (err) {
          console.log(err);
          alert('Failed to search wikipedia');
      }
    },
    async searchWikipedia(searchQuery) {
      const endpoint = `https://${this.currentRoom.lang}.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=:intitle:${searchQuery}`;
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      return json;
    },
    async displayResults(results){
      if (results.query.searchinfo.totalhits == 0) {
        this.propals = {0: {title: "No results found. Try different keywords", pageid: 0}};
      }else{
        this.propals = results.query.search;
      }
      document.getElementsByClassName('propals')[0].focus();

    },
    sendReponse(id, title){
      if(id !== 0){
        this.socket.emit('send_reponse', id, title);
      }
    },
    displayRoom(){
      this.displayModule = "room";
    },
    displayQuestion(){
      this.displayModule = "question";
    },
    displayEditRoom(){
      this.displayModule = "editRoom";
      
      this.listCategorySelected = [];
      
      CategoryDataService.getAll().then(response => {
        this.listCategory = response.data;   
      }).catch(e => {
        console.log(e);
      });
    
      for(let i = 0; i < this.currentRoom.roomCategorys.length; i++){ 
        this.listCategorySelected.push({
            id: this.currentRoom.roomCategorys[i].category.id,
            name: this.currentRoom.roomCategorys[i].category.name,
            difficulty: this.currentRoom.roomCategorys[i].difficulty,
            fullDifficulty: this.listDifficulty.find(list => list.id == this.currentRoom.roomCategorys[i].difficulty).name
          });
      }
    },
    
    //room
    showUid(event){
      if(this.uid == null){
        this.uid = this.currentRoom.uid;
        event.target.textContent = "hidden";
      }else{
        this.uid = null;
        event.target.textContent = "show";
      }
    },
    copyUid(){
      document.getElementById('linkUid').select();
      document.execCommand("copy");
      event.target.textContent = "copied";
    },
    
    
    start(){
      this.socket.emit('start_room');
    },
    playReponseTrue(){      
      this.myAudio.src = "/asset/audio/good.mp3";
      this.myAudio.play();
    
    },
    playReponseFalse(){
      this.myAudio.src = "/asset/audio/wrong.mp3";
      this.myAudio.play();
    
    },
    playOtherReponseTrue(){
      this.myAudio.src = "/asset/audio/othergood.mp3";
      this.myAudio.play();
    
    },
    
    changeVolume(event){
      this.myAudio.volume = event.target.value / 100;

      this.myAudio.src = "/asset/audio/wrong.mp3";
      this.myAudio.play();
      this.myAudio.addEventListener('timeupdate', function() {
        if (this.currentTime > 1) {
          this.pause();
        }
      }, false);
    },

    
    
    
    eventArrow(){
      document.onkeydown = function(event) {
        switch (event.keyCode) {
          case 38: //up
            if(document.activeElement.previousSibling == null){
              document.getElementById('js-search-input').focus();
            }else{
              document.activeElement.previousSibling.focus();
            }
            break;
          case 40: //down
            if(document.activeElement.id == "js-search-input" && document.getElementsByClassName('propals')[0].childNodes[0] !== undefined){
              document.getElementsByClassName('propals')[0].childNodes[0].focus();
            }else if(document.activeElement.nextSibling == null){
              document.getElementById('js-search-input').focus();
            }else{
              document.activeElement.nextSibling.focus();
            }
            break;
        }
      };
    }
  },
  mounted() {
    this.socket = io(process.env.VUE_APP_ROOT_BACK_SOCKET_URL);
    this.eventArrow();
    console.log(this.$route.params.uid);
    this.getRoomUid(this.$route.params.uid);
    var data = {
      'username': sessionStorage.getItem('username'),
      'uidRoom': this.$route.params.uid
    };
    this.socket.emit('join_room', data);
    this.eventSocket();
    
    this.myAudio = new Audio();
    this.myAudio.volume = 0.50;
  }
};


</script>

