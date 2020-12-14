const Sequelize = require("sequelize");
const db = require("../db");

const Session = db.define("session", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  courseId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  sessionNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
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

module.exports = Session;
