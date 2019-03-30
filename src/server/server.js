require("../db/dbConnect");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const movieRoute = require("./routes/movieRoute");
const genreRoute = require("./routes/genreRoute");
const customerRoute = require("./routes/customerRoute");
const rentalRoute = require("./routes/rentalRoute");

app.use(bodyParser.json());
app.use("/api/movies", movieRoute);
app.use("/api/genres", genreRoute);
app.use("/api/customers", customerRoute);
app.use("/api/rentals", rentalRoute);
app.use(function(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).send("Server Error: " + err);
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
