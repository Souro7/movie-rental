require("../db/dbConnect");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

const { Movie } = require("../models/movie");
const { Genre } = require("../models/genre");
const { Customer } = require("../models/customer");
const { Rental } = require("../models/rental");

app.get("/", async (req, res) => {
  //   const newMovie = new Movie({ title: "Badla", genre: "Drama", numberInStock: "10", dailyRentalRate: "50" });
  //   let savedMovie = await newMovie.save();
  //   res.status(200).send(savedMovie);
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
