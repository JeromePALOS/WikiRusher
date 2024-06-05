<template>
	<div>
		<h2>Wiki Rusher</h2>
		<p style="font-family: cursive; margin-top: -12px;margin-left: 4px;">Find the name of the wikipedia page</p>
		
		
		<div class="row"> 
			<div class="col-md-6 col-sm-12 bloc-home fadein">
				<div class="">
					<h2 class="giant-icon"><span aria-label="play" class="icon-play2"></span></h2>
					<div>
						<a style="display: inline-block;" class="w-100 input-dark" href="/room/create">Create a room</a>
					</div>
					

					
				</div>
			</div>
			<div class="col-md-6 col-sm-12 bloc-home fadein">
				<div class="">
					<h2 class="giant-icon rotate"><span aria-label="play" class="icon-search"></span></h2>
					<form action="/room/join" method="get" >
						<input style="width:70%" class="input-dark" type="number" placeholder="join with uid" name="uid" required />
						<input style="width:30%"  class="input-dark" type="submit" value="Join"/>
					</form>
				</div>
			</div>
			<div class="col-md-6 col-sm-12 bloc-home fadein">
				<div class="">
					<h2 class="giant-icon"><span aria-label="Change username" class="icon-user"></span></h2>
					<form action="" method="">
						<input style="width:70%" class="input-dark" id="username" v-model="username" type="text" name="username" required />
						<input style="width:30%" class="input-dark" id="submit-username" type="submit" value="Change" @click="changeUsername"  />
					</form>
				</div>	
			</div>
		</div>
		<footer>
			<a href="/legalnotice/"> Legal Notices </a>
		</footer>
	</div>

</template>
<script>


export default {
  name: "room",
  data() {
    return {
		username: ""
    };
  },
  methods: {
    changeUsername(){
	var username = document.getElementById('username').value;
	this.username = username;
	sessionStorage.setItem("username", this.username);
	document.getElementById("submit-username").value = "...";
    }
  
  },
  mounted() {
	if(
		sessionStorage.getItem("username") == "0" || 
		sessionStorage.getItem("username") == 0 || 
		sessionStorage.getItem("username") == "null" || 
		sessionStorage.getItem("username") == null || 
		sessionStorage.getItem("username") == "undefined" || 
		sessionStorage.getItem("username") == undefined
	
	){
		this.username = "user" + Math.floor(Math.random() * Math.floor(999999));	
	}else{
		this.username = sessionStorage.getItem("username");
	}
	sessionStorage.setItem("username", this.username);
	

  }
};


</script>
