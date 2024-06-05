module.exports = (sequelize, Sequelize) => {
  const UserRoom = sequelize.define("userRoom", {
    username: {
      type: Sequelize.STRING
    },
    point: {
      type: Sequelize.INTEGER
    },
    idSocket: {
      type: Sequelize.STRING
    },
    host: {
      type: Sequelize.INTEGER
    },
    found: {
      type: Sequelize.BOOLEAN
    }
  });

  return UserRoom;
};
