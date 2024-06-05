module.exports = (sequelize, Sequelize) => {
  const Room = sequelize.define("room", {
    uid: {
      type: Sequelize.INTEGER,
      unique: true
    },
    maxQuestion: {
      type: Sequelize.INTEGER
    },
    private: {
      type: Sequelize.BOOLEAN
    },
    countQuestion: {
      type: Sequelize.INTEGER
    },
    currentPage: {
      type: Sequelize.INTEGER
    },
    lang: {
      type: Sequelize.STRING
    },
    responseTime: {
      type: Sequelize.INTEGER
    }    
  });

  return Room;
};
