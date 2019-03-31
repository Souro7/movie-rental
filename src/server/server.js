require("../db/dbConnect");
const express = require("express");
const bodyParser = require("body-parser");
const winston = require("winston");
const app = express();

const movieRoute = require("./routes/movieRoute");
const genreRoute = require("./routes/genreRoute");
const customerRoute = require("./routes/customerRoute");
const rentalRoute = require("./routes/rentalRoute");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log", level: "info" })
  ]
});

process.on("uncaughtException", err => {
  logger.log({
    level: "error",
    message: err
  });
  process.exit();
});

process.on("unhandledRejection", (reason, p) => {
  logger.log({
    level: "error",
    message: `Unhandled Rejection at: ${p}, reason: ${reason}`
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

module.exports = logger;
