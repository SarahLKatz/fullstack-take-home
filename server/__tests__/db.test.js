const db = require("../db/index");
const User = db.model("user");
const Course = db.model("course");
const Section = db.model("section");
const Session = db.model("session");

afterAll(() => {
  return db.close();
});

describe("User model", () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe("Creates User", () => {
    describe("Saves user name and email", () => {
      let user;

      beforeEach(async () => {
        user = await User.create({
          name: "Mickey Mouse",
          email: "mmouse@charactermail.com",
          password: "Minnie4ever",
        });
      });

      it("creates a user in the database with the correct email", () => {
        expect(user.email).toEqual("mmouse@charactermail.com");
      });

      it("saves the users name in the database", () => {
        expect(user.name).toEqual("Mickey Mouse");
      });
    });
  });

  describe("Instance Methods", () => {
    describe("correctPassword method", () => {
      let user;

      beforeEach(async () => {
        user = await User.create({
          name: "Donald Duck",
          email: "dduck@charactermail.com",
          password: "Daisy!",
        });
      });

      it("returns true if the password is correct", () => {
        expect(user.correctPassword("Daisy!")).toEqual(true);
      });

      it("returns false if the password is incorrect", () => {
        expect(user.correctPassword("Minnie4ever")).toEqual(false);
      });
    });
  });
});

describe("Course model", () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe("Creates Course", () => {
    describe("Saves course with id, name, and description", () => {
      let course;
      const courseDescription =
        "Come on, let's go and play. I never see you anymore, come out the door, it's like you've gone away.";

      beforeEach(async () => {
        course = await Course.create({
          id: 1,
          name: "Do You Want To Build A Snowman?",
          description: courseDescription,
        });
      });

      it("creates a course in the database with the correct course id", () => {
        expect(course.id).toEqual(1);
      });
      it("creates a course in the database with the correct name", () => {
        expect(course.name).toEqual("Do You Want To Build A Snowman?");
      });
      it("creates a course in the database with the correct description", () => {
        expect(course.description).toEqual(courseDescription);
      });
    });
  });
});

describe("Section model", () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe("Creates Section", () => {
    describe("Saves section with id, courseId, nickname, and start date", () => {
      let section;

      beforeEach(async () => {
        section = await Section.create({
          id: 1,
          courseId: 1,
          nickname: "Section 1",
          dateStart: "2020-10-30",
        });
      });

      it("creates a section in the database with the correct section id", () => {
        expect(section.id).toEqual(1);
      });
      it("creates a section in the database with the correct course id", () => {
        expect(section.courseId).toEqual(1);
      });
      it("creates a section in the database with the correct nickname", () => {
        expect(section.nickname).toEqual("Section 1");
      });
      it("creates a section in the database with the correct start date", () => {
        expect(section.dateStart).toEqual("2020-10-30");
      });
    });
  });

  // Test For User Connection?
});

describe("Session model", () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe("Creates Session", () => {
    describe("Saves session with id, courseId, sessionNumber, name, and description", () => {
      let session;
      const sessionDescription =
        "It began with two sisters, one born with magical powers, one born powerless, their love of snowmen: infinite.";

      beforeEach(async () => {
        session = await Session.create({
          id: 1,
          courseId: 1,
          sessionNumber: 1,
          name: "Frozen",
          description: sessionDescription,
        });
      });

      it("creates a session in the database with the correct session id", () => {
        expect(session.id).toEqual(1);
      });
      it("creates a session in the database with the correct course id", () => {
        expect(session.courseId).toEqual(1);
      });
      it("creates a session in the database with the correct session number", () => {
        expect(session.sessionNumber).toEqual(1);
      });
      it("creates a session in the database with the correct name", () => {
        expect(session.name).toEqual("Frozen");
      });
      it("creates a session in the database with the correct description", () => {
        expect(session.description).toEqual(sessionDescription);
      });
    });
  });
});
