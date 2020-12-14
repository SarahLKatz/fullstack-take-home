const Sequelize = require("sequelize");
const db = new Sequelize(`postgres://localhost:5432`, {
  dialect: "postgres",
  logging: false,
});
module.exports = db;
