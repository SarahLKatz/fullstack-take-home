const Sequelize = require("sequelize");
const db = require("../db");

const Section = db.define("section", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  courseId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  nickname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dateStart: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  totalEnrolled: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Section;
