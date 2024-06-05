const db = require("../models");
const Room = db.rooms;
const RoomCategory = db.roomCategorys;
const UserRoom = db.userRooms;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Create a room
  const room = {
    uid: Math.floor(Math.random() * Math.floor(999999)),
    maxQuestion: (req.body.maxQuestion >= 2 && req.body.maxQuestion <= 50 ) ? req.body.maxQuestion  : 10,
    lang: req.body.lang ? req.body.lang : 'fr',
    responseTime: (req.body.responseTime >= 10 && req.body.responseTime <= 90)? req.body.responseTime : 40,
    private: req.body.private ? req.body.private : true,
    countQuestion: 0,
    currentPage: 0,
  };
  var listCategory = req.body.listCategory;
  var roomCategory = [];

    Room.findAll({ uid: room.uid }).then(data => {
      room.uid = Math.floor(Math.random() * Math.floor(999999));
    });



  // Save Room in the database
  Room.create(room).then(data => {

    listCategory.forEach(function(cat, index, arr) {
      roomCategory.push({
        roomId: data.id,
        categoryId: cat.id,
        difficulty: cat.difficulty
      });
    });
    RoomCategory.bulkCreate(roomCategory).then(roomCategoryData => {
        
        
        
      res.send(data);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Room (add category)."
      });
    });
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Room."
    });
  });
};

// Retrieve all Rooms from the database.
exports.findAll = (req, res) => {
  const uid = req.query.uid;
  var condition = uid ? { uid: { [Op.like]: `%${uid}%` } } : null;

  Room.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Rooms."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Room.findByPk(id, {
    include: [{
      model: db.roomCategorys,
      as: "roomCategorys",
      include: [{
        model: db.categorys,
        as: "category",
        required: false
      }]
    }]
  }).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: "Error retrieving Room with id=" + id
    });
  });
};

exports.findOneByUid = (req, res) => {
  const uid = req.params.uid;

  Room.findOne({
    where: {uid: uid},
    include: [{
      model: db.roomCategorys,
      as: "roomCategorys",
      include: [{
        model: db.categorys,
        as: "category",
        required: false
      }]
    }]
  }).then(data => {
    if(data.id == undefined){
      res.status(500).send({
        message: "Error retrieving Room without id"
      });
    }
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: "Error retrieving Room with uid=" + uid
    });
  });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  var listCategory = req.body.listCategory;
  var roomCategory = [];
  
  
  
  //verif
  UserRoom.findAll({
    where: {
      host: 1,
      idSocket: req.body.idSocket,
      roomId: id
    }
  }).then(data => {

    //if host
    console.log(data);
    if(data !== null && data !== undefined && data.length == 1){
      listCategory.forEach(function(cat, index, arr) {
        roomCategory.push({
          roomId: req.params.id,
          categoryId: cat.id,
          difficulty: cat.difficulty
        });
      });
      
      const room = {
        maxQuestion: (req.body.room.maxQuestion >= 2 && req.body.room.maxQuestion <= 50 ) ? req.body.room.maxQuestion  : 10,
        lang: req.body.room.lang ? req.body.room.lang : 'fr',
        responseTime: (req.body.room.responseTime >= 10 && req.body.room.responseTime <= 90)? req.body.room.responseTime : 40,
        private: req.body.room.private ? req.body.room.private : true,
      };

      
            
      Room.update(room, {
        where: { id: id }
      }).then(num => {
        if (num == 1) {
          //delete RoomCategory
          RoomCategory.destroy({
            where: {roomId: id},
            truncate: false
          }).then(nums => {
           
           //create RoomCategory
            
            RoomCategory.bulkCreate(roomCategory).then(roomCategoryData => {
              res.send({message: "Room was updated successfully."});
            }).catch(err => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while creating the Room (add category)."
              });
            });

          }).catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while removing all rooms."
            });
          });
        } else {
          res.send({
            message: `Cannot update Room with id=${id}. Maybe Tutorial was not found or req.body is empty!`
          });
        }
      }).catch(err => {
        res.status(500).send({
          message: "Error updating Room with id=" + id
        });
      });



    }
  });
};


// Delete all Tutorials from the database.
exports.deleteOldRoom = (req, res) => {
  var date = new Date();
  date.setDate(date.getDate() - 2);
  console.log(date);
  
  
  Room.destroy({
    where: { 
      updatedAt: {[Op.lt]: date}
    },
    truncate: false
  }).then(nums => {
      res.send({ message: `${nums} Rooms were deleted successfully!` });
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all rooms."
    });
  });
};


// Find all public room
exports.findAllPublic = (req, res) => {
  Room.findAll({ where: { private: false } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving rooms."
      });
    });
};




exports.nextQuestion = (data) => {
    Room.findOne({where: {uid: data['uid']}})
    .then(room => {
      if(room.id == undefined){
        return false;
      }

        Room.update({
          countQuestion: room.countQuestion + 1,
          currentPage: data['currentPage'],
        },
        {
          where: { uid: data['uid'] }
        })
          .then(num => {
            if (num == 1) {
              return true;
            } else {
              return false;
            }
          })
          .catch(err => {
            return false;
          });
    })
    .catch(err => {
      return false;
    });
};

