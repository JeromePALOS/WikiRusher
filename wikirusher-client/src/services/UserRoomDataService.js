import http from "../http-common";

class UserRoomDataService {

  
  create(data) {
    return http.post("/userRoom/create", data);
  }
  findByRoom(idRoom){
    return http.get("/userRoom/r/" + idRoom);
  }


}

export default new UserRoomDataService();
