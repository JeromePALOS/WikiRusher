module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define("category", {
    name: {
      type: Sequelize.STRING
    },
    lang: {
      type: Sequelize.STRING
    },
    parent: {
      type: Sequelize.STRING
    },
    actif: {
      type: Sequelize.BOOLEAN
    }
  });

  return Category;
};
