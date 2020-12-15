const db = require("../db");
const request = require("supertest");
const { app, server } = require("../server");
const User = db.model("user");
const Course = db.model("course");
const Section = db.model("section");
const Session = db.model("session");

afterAll(async () => {
  await db.close();
  await server.close();
});

describe("Course endpoints", () => {
  beforeEach(async () => {
    await db.sync({ force: true });
    await Course.create({
      id: 1,
      name: "Harry Potter",
      description: "The author is trash but the world is magical",
    });
    await Section.create({
      id: 1,
      courseId: 1,
      nickname: "The Sorcerer's Stone",
      dateStart: "2020-12-27",
    });
    await Session.create({
      id: 1,
      courseId: 1,
      sessionNumber: 1,
      name: "The Chamber of Secrets",
      description: "Basilisks are scary, but Harry is brave.",
    });
    await Session.create({
      id: 2,
      courseId: 1,
      sessionNumber: 2,
      name: "Prisoner of Azkaban",
      description: "Prisoner? Godfather? Both? The world will never know.",
    });
  });
  it("/courses gets all courses", async (done) => {
    const res = await request(app)
      .get("/api/courses")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    const firstCourse = res.body[0];
    expect(firstCourse.name).toEqual("Harry Potter");
    expect(firstCourse.description).toEqual(
      "The author is trash but the world is magical"
    );
    done();
  });
  it("/courses/:id/sections gets all sections for a given course", async (done) => {
    const res = await request(app)
      .get("/api/courses/1/sections")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    const firstSection = res.body[0];
    expect(firstSection.nickname).toEqual("The Sorcerer's Stone");
    expect(firstSection.dateStart).toEqual("2020-12-27");
    done();
  });
  it("/courses/:id/sessions gets all session for a given course", async (done) => {
    const res = await request(app)
      .get("/api/courses/1/sessions")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    const sessions = res.body;
    expect(sessions.length).toEqual(2);
    expect(sessions[0].sessionNumber).toEqual(1);
    expect(sessions[0].name).toEqual("The Chamber of Secrets");
    expect(sessions[0].description).toEqual(
      "Basilisks are scary, but Harry is brave."
    );
    done();
  });
});
