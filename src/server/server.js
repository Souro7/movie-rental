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
    new winston.transports.File({ filename: "combined.log" })
  ]
});

app.use(bodyParser.json());
app.use("/api/movies", movieRoute);
app.use("/api/genres", genreRoute);
app.use("/api/customers", customerRoute);
app.use("/api/rentals", rentalRoute);
app.use(function(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).send("Error: " + err);
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
