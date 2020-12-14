const { Course, Section, Session } = require("./db/models");
const courses = require("../data/courses");
const sections = require("../data/course-sections");
const sessions = require("../data/course-sessions");
const db = require("./db");

const seed = async () => {
  await Promise.all(courses.map((course) => Course.create(course)));
  await Promise.all(sections.map((section) => Section.create(section)));
  await Promise.all(sessions.map((session) => Session.create(session)));
};
const main = async () => {
  try {
    await db.sync({ force: true });
    await seed();
    await db.close();
    return null;
  } catch (err) {
    console.log("Error while seeding");
    console.log(err.stack);
  }
};

main();
