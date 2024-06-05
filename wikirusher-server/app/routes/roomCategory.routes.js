module.exports = app => {
  const roomCategorys = require("../controllers/roomCategory.controller.js");

  var router = require("express").Router();

  router.get("/r/:id", roomCategorys.findByRoom);

  app.use('/api/roomCategory', router);
};
