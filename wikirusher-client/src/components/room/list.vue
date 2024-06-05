<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by uid"
          v-model="uid"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchUid"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Rooms List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(room, index) in rooms"
          :key="index"
          @click="setActiveRoom(room, index)"
        >
          {{ room.uid }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllRooms">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentRoom">
        <h4>Room</h4>
        <div>
          <label><strong>Uid:</strong></label> {{ currentRoom.uid }}
        </div>
        <div>
          <label><strong>maxQuestion:</strong></label> {{ currentRoom.maxQuestion }}
        </div>
        <div>
          <label><strong>Private:</strong></label> {{ currentRoom.private ? "Private" : "Public" }}
        </div>

        <a class="badge badge-primary"
          :href="'/room/join?uid=' + currentRoom.uid"
        >
          Join
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Room...</p>
      </div>
    </div>
  </div>
</template>

<script>
import RoomDataService from "../../services/RoomDataService";

export default {
  name: "rooms-list",
  data() {
    return {
      rooms: [],
      currentRoom: null,
      currentIndex: -1,
      uid: ""
    };
  },
  methods: {
    retrieveRooms() {
      RoomDataService.findByPublic()
        .then(response => {
          this.rooms = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveRooms();
      this.currentRoom = null;
      this.currentIndex = -1;
    },

    setActiveRoom(room, index) {
      this.currentRoom = room;
      this.currentIndex = index;
    },

    removeAllRooms() {
      RoomDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchUid() {
      RoomDataService.findByUid(this.uid)
        .then(response => {
          this.rooms = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveRooms();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
