<template>
  <div v-if="currentRoom" class="edit-form">
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
                  <option v-for="category in listCategory" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </option>
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
    <p>{{ message }}</p>
  </div>

</template>

<script>
import RoomDataService from "../../services/RoomDataService";
import CategoryDataService from "../../services/CategoryDataService";
import RoomCategoryDataService from "../../services/RoomCategoryDataService";

export default {
  name: "room",
  data() {
    return {
      currentRoom: null,
      message: '',
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
      ]
    };
  },
  methods: {
    getRoom(id) {
      RoomDataService.get(id)
        .then(response => {
          this.currentRoom = response.data;
          console.log(response);
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateRoom() {
      var data = {
        room: this.currentRoom,
        listCategory: this.listCategorySelected
      };
      
      RoomDataService.update(this.currentRoom.id, data)
        .then(response => {
          console.log(response.data);
          this.message = 'The room was updated successfully!';
          this.$router.push('/room/join?uid=' + this.currentRoom.uid);
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

    }

  },    
  mounted() {
    this.message = '';
    this.getRoom(this.$route.query.id);
    CategoryDataService.getAll().then(response => {
      this.listCategory = response.data;   
    }).catch(e => {
      console.log(e);
    });
    RoomCategoryDataService.findByRoom(this.$route.query.id).then(response => {
      console.log(response);
      for(let i = 0; i < response.data.length; i++){ 
      console.log(response);
        this.listCategorySelected.push({
            id: response.data[i].category.id,
            name: response.data[i].category.name,
            difficulty: response.data[i].difficulty,
            fullDifficulty: this.listDifficulty.find(list => list.id == response.data[i].difficulty).name
          });
      }
    }).catch(e => {
      console.log(e);
    });

    
  }
};

</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
