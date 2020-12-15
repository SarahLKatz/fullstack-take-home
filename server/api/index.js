const router = require("express").Router();
const { Course, Section, Session, User } = require("../db/models");
const db = require("../db");

module.exports = router;

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,POST"),
    res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.findAll();
    return res.json(courses);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/courses/:id/sections", async (req, res) => {
  try {
    const sections = await Section.findAll({
      where: {
        courseId: req.params.id,
      },
    });
    return res.json(sections);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/courses/:id/sessions", async (req, res) => {
  try {
    const sessions = await Session.findAll({
      where: {
        courseId: req.params.id,
      },
    });
    return res.json(sessions);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/section/:sectionId", async (req, res) => {
  try {
    const section = await Section.findOne({
      where: { id: req.params.sectionId },
      attributes: ["id", "courseId", "nickname", "dateStart", "userId"],
    });
    res.send(section);
  } catch (err) {
    console.error(err);
  }
});

router.get("/section/:sectionId/users", async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        sectionId: req.params.sectionId,
      },
      attributes: ["name"],
    });
    await res.send(users);
  } catch (err) {
    console.error(err);
  }
});

router.post("/section/:sectionId/enroll", async (req, res) => {
  // check if user is already enrolled
  try {
    const section = await Section.findOne({
      where: { id: req.params.sectionId },
      attributes: ["id", "totalEnrolled"],
    });
    const user = await User.findOne({
      where: { id: req.body.loggedIn },
      attributes: ["id", "sectionId"],
    });
    if (!section || !user) {
      res.status(404).send("Not found");
    } else if (user.sectionId !== null) {
      res.status(400).send("User is already enrolled in a course");
    } else if (section.totalEnrolled === 10) {
      res.status(400).send("Section is full");
    } else {
      await section.update({ totalEnrolled: section.totalEnrolled + 1 });
      await user.update({ sectionId: section.id });
      res.send(section);
    }
  } catch (err) {
    console.error(err);
  }
});

router.post("/section/:sectionId/remove", async (req, res) => {
  try {
    const section = await Section.findOne({
      where: { id: req.params.sectionId },
      attributes: ["id", "totalEnrolled"],
    });
    const user = await User.findOne({
      where: { id: req.body.loggedIn },
      attributes: ["id", "sectionId"],
    });
    if (!section || !user) {
      res.status(404).send("Not found");
    } else if (user.sectionId !== +req.params.sectionId) {
      res.status(400).send("User is not enrolled in this section");
    } else {
      await section.update({ totalEnrolled: section.totalEnrolled - 1 });
      await user.update({ sectionId: null });
      res.send(section);
    }
  } catch (err) {
    console.error(err);
  }
});

router.post("/signup", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json({ id: user.id });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      console.error(err.message);
    }
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
      attributes: ["id", "name", "email"],
    });
    if (!user || !user.correctPassword(req.body.password)) {
      /* 
        I made the decision to use the same error message whether or not the user exists so that any potential hackers 
        don't know if they just have the password wrong or if they're using an email that doesn't have an account in our system
      */
      res.status(401).send("Username or password not found");
    } else {
      res.json(user);
    }
  } catch (err) {
    console.error(err);
  }
});

router.post("/logout", (req, res) => {
  res.redirect("/");
});

router.get("/user/:userId", async (req, res) => {
  try {
    if (req.body.loggedIn !== +req.params.userId) {
      /* 
        We only want users to be able to fetch their own data - 
        this checks that the data that is being requested is for the logged-in user
      */
      res.status(401).send("Unauthorized");
    }
    const user = await User.findOne({
      where: {
        id: req.params.userId,
      },
      attributes: ["id", "name", "email", "sectionId"],
    });
    res.json(user);
  } catch (err) {
    console.error(err.message);
  }
});
