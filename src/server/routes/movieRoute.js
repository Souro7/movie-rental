const routes = require("express").Router();
const Joi = require("joi");

const { Genre, genreJoiSchema } = require("../../models/genre");
const { Movie, movieJoiSchema } = require("../../models/movie");

//get all movies
routes.get("/", async (req, res, next) => {
  try {
    await Movie.find()
      .populate({ path: "genre", select: "name -_id", model: Genre })
      .exec(function(err, movie) {
        if (err) {
          console.log(err);
        }
        res.status(200).send(movie);
      });
  } catch (e) {
    next(e);
  }
});

//add a new movie
routes.post("/", async (req, res, next) => {
  try {
    let { title, genre, numberInStock, dailyRentalRate } = req.body;
    let { error, value } = Joi.validate({ title, genre, numberInStock, dailyRentalRate }, movieJoiSchema);
    console.log(error);
    if (error) res.status(400).send("error in request: " + error);
    const newMovie = new Movie(value);
    let response = await newMovie.save();
    res.status(200).send(response);
  } catch (e) {
    next(e);
  }
});

//retrieve a movie based on id
routes.get("/:movieId", async (req, res, next) => {
  try {
    const movieId = req.params.movieId;
    await Movie.findOne({ _id: movieId }).then(response => {
      res.status(200).send(response);
    });
  } catch (e) {
    next(e);
  }
});

//update the details of a movie
routes.put("/:movieId", async (req, res, next) => {
  try {
    const movieId = req.params.movieId;
    let { title, genre, numberInStock, dailyRentalRate } = req.body;
    let { error, value } = Joi.validate({ title, genre, numberInStock, dailyRentalRate }, movieJoiSchema);
    if (error) {
      res.status(400).send("error in request: " + error);
    }

    await Movie.findOneAndUpdate({ _id: movieId }, { $set: value }, { new: true }).then(response => {
      res.status(200).send(response);
    });
  } catch (e) {
    next(e);
  }
});

//delete a movie
routes.delete("/:movieId", async (req, res, next) => {
  try {
    const movieId = req.params.movieId;
    await Movie.findOneAndDelete({ _id: movieId }).then(response => {
      res.status(200).send(response);
    });
  } catch (e) {
    next(e);
  }
});

module.exports = routes;
