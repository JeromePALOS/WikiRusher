module.exports = app => {
  const userRooms = require("../controllers/userRoom.controller.js");

  var router = require("express").Router();

  router.post("/create", userRooms.create);
  router.get("/r/:roomId", userRooms.findByRoom);


  app.use('/api/userRoom', router);
};
