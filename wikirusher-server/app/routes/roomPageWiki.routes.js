module.exports = app => {
  const roomPageWikis = require("../controllers/roomPageWiki.controller.js");

  var router = require("express").Router();

  router.get("/r/:roomId", roomPageWikis.findByRoom);

  app.use('/api/roomPageWiki', router);
};
