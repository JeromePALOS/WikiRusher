module.exports = (sequelize, Sequelize) => {
  const PageWiki = sequelize.define("pageWiki", {
    pageWikiId: {
      type: Sequelize.INTEGER
    },
    difficulty: {
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    lang: {
      type: Sequelize.STRING
    }
  });

  return PageWiki;
};
