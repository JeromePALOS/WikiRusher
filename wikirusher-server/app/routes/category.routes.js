module.exports = app => {
  const categorys = require("../controllers/category.controller.js");

  var router = require("express").Router();

  router.get("/", categorys.findAll);
  
  router.post("/create", categorys.create);
  //router.put("/update/:id/actif/:actif", categorys.update);

  app.use('/api/category', router);
};
