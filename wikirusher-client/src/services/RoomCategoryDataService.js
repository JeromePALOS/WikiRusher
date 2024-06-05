import http from "../http-common";

class RoomCategoryDataService {

  
  findByRoom(id) {
    return http.get(`/roomCategory/r/${id}`);
  }

}

export default new RoomCategoryDataService();
