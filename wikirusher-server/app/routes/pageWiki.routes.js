module.exports = app => {
  const pageWikis = require("../controllers/pageWiki.controller.js");

  var router = require("express").Router();
  
  router.get("/category/:categoryId", pageWikis.findByCategory);
  
  //router.get("/addMultiple/:lang/:parent/:cat", pageWikis.addPages);
  //router.post("/create", pageWikis.create);
  //router.get("/", pageWikis.findAll);

  app.use('/api/pageWiki', router);
};
