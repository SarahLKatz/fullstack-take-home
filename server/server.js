const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 8080;

app.use(bodyParser.json());

app.use("/api", require("./api"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const server = app.listen(port, () => {
  console.log(`Course Signup Server listening at http://localhost:${port}`);
});

module.exports = {server, app};
