const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.rooms = require("./room.model.js")(sequelize, Sequelize);
db.userRooms = require("./userRoom.model.js")(sequelize, Sequelize);
db.categorys = require("./category.model.js")(sequelize, Sequelize);
db.pageWikis = require("./pageWiki.model.js")(sequelize, Sequelize);
db.roomPageWikis = require("./roomPageWiki.model.js")(sequelize, Sequelize);
db.roomCategorys = require("./roomCategory.model.js")(sequelize, Sequelize);

db.rooms.hasMany(db.userRooms, {as: "userRooms" });
db.userRooms.belongsTo(db.rooms, {
  foreignKey: "roomId",
  as: "room"
});

db.categorys.hasMany(db.pageWikis, {as: "pageWikis" });
db.pageWikis.belongsTo(db.categorys, {
  foreignKey: "categoryId",
  as: "category"
});

db.rooms.hasMany(db.roomCategorys, {as: "roomCategorys" });
db.roomCategorys.belongsTo(db.rooms, {
  foreignKey: "roomId",
  as: "room"
});

db.categorys.hasMany(db.roomCategorys, {as: "roomCategorys" });
db.roomCategorys.belongsTo(db.categorys, {
  foreignKey: "categoryId",
  as: "category"
});

db.rooms.hasMany(db.roomPageWikis, {as: "roomPageWikis" });
db.roomPageWikis.belongsTo(db.rooms, {
  foreignKey: "roomId",
  as: "room"
});







module.exports = db;