const db = require("../models");
const Category = db.categorys;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  var category = {
    name: req.body.name,
    lang: req.body.lang,
    actif: req.body.actif,
    parent: req.body.parent,
  };

  Category.create(category)
  .then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the category."
    });
  });
};



exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` }, actif: 1 } : { actif: 1 };

  Category.findAll({
     where: condition,
    order: [['parent'],['id', 'ASC']],

  }).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving category."
      });
    });
};


// Update a category by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  const actif = req.params.actif;      
  Category.update(
    {actif: actif}, 
    {where: { id: id }}
  ).then(Cat => {
    res.send({message: "Category was updated successfully."});
  }).catch(err => {
    res.status(500).send({
      message: "Error updating category with id=" + id
    });
  });
};



