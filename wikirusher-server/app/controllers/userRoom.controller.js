const db = require("../models");
const UserRoom = db.userRooms;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  var userRoom = {
    roomId:  req.body.roomId,
    username: req.body.username,
    point: 0,
    host: 0
  };
  
  //If first user then he become host
  UserRoom.findAll({where: {roomId: req.body.roomId}})
  .then(data => {
    if(data.length <= 0){
      userRoom.host = 1;
    }
  }); 
  
  UserRoom.findAll({where: {roomId: req.body.roomId, username: req.body.username}})
    .then(data => {
      if(data.length <= 0){
        console.log(userRoom);
        UserRoom.create(userRoom)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the USerRoom."
          });
        }); 
      }
    })
    .catch(err => {
    });
  
  


};

exports.findByRoom = (req, res) => {
  const roomId = req.params.roomId;

  UserRoom.findAll({where: {roomId: roomId}, order: [['point', 'DESC']]})
    .then(data => {
      
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving UserRoom"
      });
    });
};







