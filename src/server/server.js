require("../db/dbConnect");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("./winstonLogger");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const path = require("path");
const app = express();

const movieRoute = require("./routes/movieRoute");
const genreRoute = require("./routes/genreRoute");
const customerRoute = require("./routes/customerRoute");
const rentalRoute = require("./routes/rentalRoute");

const publicKEY = fs.readFileSync(path.resolve(__dirname, "../key/jwtRS256.key.pub"));

process.on("uncaughtException", err => {
  logger.log({
    level: "error",
    message: err
  });
  process.exit();
});

process.on("unhandledRejection", err => {
  logger.log({
    level: "error",
    message: err
  });
  process.exit();
});

app.use(bodyParser.json());

//token verification middleware
app.use(function(req, res, next) {
  try {
    const token = req.header("x-auth");
    const decoded = jwt.verify(token, publicKEY, { algorithm: ["RS256"] });
    logger.log({
      level: "info",
      message: "successful authentication"
    });
    next();
  } catch (error) {
    res.status(400).send("Invalid credentials");
  }
});

app.use("/api/movies", movieRoute);
app.use("/api/genres", genreRoute);
app.use("/api/customers", customerRoute);
app.use("/api/rentals", rentalRoute);

//error handling middleware
app.use(function(err, req, res, next) {
  logger.log({
    level: "error",
    message: err
  });
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.code || 500).send("Error: " + err.message);
});

app.listen(3000, function() {
  console.log("listening on port 3000!");
});
