module.exports = (sequelize, Sequelize) => {
  const RoomCategory = sequelize.define("roomCategory", {
    difficulty: {
      type: Sequelize.INTEGER
    }
  });

  return RoomCategory;
};
