const Sequelize = require("sequelize");
const db = require("../db");

const Course = db.define("course", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Course;
