import http from "../http-common";

class RoomDataService {
  getAll() {
    return http.get("/room");
  }

  get(id) {
    return http.get(`/room/${id}`);
  }
  
  findOneByUid(uid) {
    return http.get(`/room/u/${uid}`);
  }
  
  findByPublic() {
    return http.get(`/room/public`);
  }
  
  create(data) {
    return http.post("/room/create", data);
  }

  update(id, data) {
    return http.put(`/room/update/${id}`, data);
  }
  
  
  
  
  
  
  

  delete(id) {
    return http.delete(`/room/delete/${id}`);
  }

  deleteAll() {
    return http.delete(`/room/delete/all`);
  }

}

export default new RoomDataService();
