require("../db/dbConnect");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const { Genre } = require("../models/genre");
const { Movie } = require("../models/movie");
const { Customer } = require("../models/customer");
const { Rental } = require("../models/rental");

app.get("/", async (req, res) => {
  res.status(200).send("sent");
});

//get all movies
app.get("/api/movies", async (req, res) => {
  await Movie.find()
    .populate({ path: "genre", select: "name -_id", model: Genre })
    .exec(function(err, movie) {
      if (err) {
        console.log(err);
      }
      console.log(movie);
      res.status(200).send(movie);
    });
});

//add a movie
app.post("/api/movies", (req, res) => {
  const title = req.query.title;
  const genre = req.query.genre;
  const numberInStock = req.query.numberInStock;
  const dailyRentalRate = req.query.dailyRentalRate;
  const newMovie = new Movie({
    title: title,
    genre: genre,
    numberInStock: numberInStock,
    dailyRentalRate: dailyRentalRate
  });
  newMovie.save().then(response => {
    res.status(200).send(response);
  });
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
