require("../db/dbConnect");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("./winstonLogger");
const app = express();

const movieRoute = require("./routes/movieRoute");
const genreRoute = require("./routes/genreRoute");
const customerRoute = require("./routes/customerRoute");
const rentalRoute = require("./routes/rentalRoute");

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
  res.status(500).send("Error: " + err);
});

app.listen(3000, function() {
  console.log("listening on port 3000!");
});
