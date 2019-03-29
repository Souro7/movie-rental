const routes = require("express").Router();
const Joi = require("joi");
const { Genre, genreJoiSchema } = require("../../models/genre");
const { Movie, movieJoiSchema } = require("../../models/movie");

routes.get("/", async (req, res) => {
  res.status(200).send("connected!");
});

//get all movies
routes.get("/api/movies", async (req, res) => {
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
routes.post("/api/movies", async (req, res) => {
  let reqObj = { title: req.body.title, genre: req.body.genre, numberInStock: req.body.numberInStock, dailyRentalRate: req.body.dailyRentalRate };
  let { error, value } = Joi.validate(reqObj, movieJoiSchema);
  if (error) res.status(400).send("error in request: " + error);
  const newMovie = new Movie(value);
  let response = await newMovie.save();
  res.status(200).send(response);
});

//retrieve a movie based on id
routes.get("/api/movies/:movieId", async (req, res) => {
  const movieId = req.params.movieId;
  await Movie.findOne({ _id: movieId }).then(response => {
    res.status(200).send(response);
  });
});

//update the details of a movie
routes.put("/api/movies/:movieId", async (req, res) => {
  const movieId = req.params.movieId;
  let reqObj = { title: req.body.title, genre: req.body.genre, numberInStock: req.body.numberInStock, dailyRentalRate: req.body.dailyRentalRate };
  let { error, value } = Joi.validate(reqObj, movieJoiSchema);
  if (error) {
    res.status(400).send("error in request: " + error);
  }

  await Movie.findOneAndUpdate({ _id: movieId }, { $set: value }, { new: true }).then(response => {
    res.status(200).send(response);
  });
});

//delete a movie
routes.delete("/api/movies/:movieId", async (req, res) => {
  const movieId = req.params.movieId;
  await Movie.findOneAndDelete({ _id: movieId }).then(response => {
    res.status(200).send(response);
  });
});

module.exports = routes;
