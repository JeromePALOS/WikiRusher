<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="maxQuestion">Max Question</label>
        <input
          type="number"
          class="w-100 input-dark"
          id="maxQuestion"
          required
          v-model="room.maxQuestion"
          name="maxQuestion"
          min="1"
          max="50"
        />
      </div>
      <div class="form-group">
        <label for="lang">Lang</label>
        <select
          class="w-100 input-dark"
          id="lang"
          required
          v-model="room.lang"
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
          v-model="room.responseTime"
          name="responseTime"
          min="10"
          max="90"
        />
      </div>
      
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
                      <option disabled="disabled" style="font-weight: 700; background-color: grey; color: white;" v-if="listCategory[index-1] == undefined || category.parent != listCategory[index-1].parent" :key="`parent-${category.id}`">
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
      
      <div class="form-group" style="display:none">
        <label for="private">Private</label>
        <input
          type="checkbox"
          id="private"
          v-model="room.private"
          name="private"
        />
      </div>

      

      <button @click="saveRoom" class="w-100 input-dark">Create this room</button>
    </div>

  </div>
</template>

<script>
import RoomDataService from "../../services/RoomDataService";
import CategoryDataService from "../../services/CategoryDataService";

export default {
  name: "add-room",
  data() {
    return {
      room: {
        id: null,
        uid: "",
        maxQuestion: "10",
        responseTime: "40",
        lang: "fr",
        private: true
      },
      submitted: false,
      listCategorySelected: [
        {
          id: 1,
          name: "Popular",
          difficulty: 2,
          fullDifficulty: "Easy",
        }
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
    saveRoom() {
      if(this.listCategorySelected.length > 0 ){
        var data = {
          uid: this.room.uid,
          maxQuestion: this.room.maxQuestion,
          private: this.room.private,
          lang: this.room.lang,
          responseTime: this.room.responseTime,
          listCategory: this.listCategorySelected
        };
        RoomDataService.create(data)
          .then(response => {
            this.room.uid = response.data.uid;
            this.submitted = true;
            this.$router.push('/room/join?uid=' + this.room.uid);
          })
          .catch(e => {
            console.log(e);
          });
      }else{
        alert("no category selected");
      }
    },
    newRoom() {
      this.submitted = false;
      this.room = {};
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
    CategoryDataService.getAll().then(response => {
      this.listCategory = response.data;
    }).catch(e => {
      console.log(e);
    });

    
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
