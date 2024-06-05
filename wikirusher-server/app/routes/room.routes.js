module.exports = app => {
  const rooms = require("../controllers/room.controller.js");

  var router = require("express").Router();

  router.post("/create", rooms.create);
  router.get("/public", rooms.findAllPublic);
  router.get("/u/:uid", rooms.findOneByUid);
  router.put("/update/:id", rooms.update);


  //router.get("/", rooms.findAll);
  //router.get("/:id", rooms.findOne);
  router.delete("/delete/all", rooms.deleteOldRoom);


  app.use('/api/room', router);
};
