const db = require("../models");
const RoomCategory = db.roomCategorys;
const Category = db.categorys;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  var roomCategory = {
    roomId: req.body.roomId,
    categoryId: req.body.categoryId,
  };
  
  RoomCategory.create(roomCategory)
  .then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the RoomCategory."
    });
  });
};



exports.findByRoom = (req, res) => {
  const id = req.params.id;

  RoomCategory.findAll({ 
    where: {roomId: id},
    include: [{
      model: db.categorys,
      as: "category",
      
    }]
  }).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Rooms."
    });
  });
};



