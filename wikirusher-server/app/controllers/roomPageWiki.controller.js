const db = require("../models");
const RoomPageWiki = db.roomPageWikis;
const Room = db.rooms;
const Op = db.Sequelize.Op;
const fetch = require("node-fetch");

exports.create = (req, res) => {
  var roomPageWiki = {
    pageWikiId: req.body.pageWikiId,
    roomId: req.body.roomId,
  };
  
  RoomPageWiki.create(roomPageWiki)
  .then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the RoomPageWiki."
    });
  });
};


exports.findByRoom = (req, res) => {
  const roomId = req.params.roomId;

  RoomPageWiki.findAll({where: {roomId: roomId}})
    .then(data => {
      
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Room"
      });
    });
};
