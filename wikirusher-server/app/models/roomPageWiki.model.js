module.exports = (sequelize, Sequelize) => {
  const RoomPageWiki = sequelize.define("roomPageWiki", {
    pageWikiId: {
      type: Sequelize.INTEGER
    }
  });

  return RoomPageWiki;
};
