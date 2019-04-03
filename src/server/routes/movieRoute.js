const routes = require("express").Router();
const Joi = require("joi");

const { Genre, genreJoiSchema } = require("../../models/genre");
const { Movie, movieJoiSchema } = require("../../models/movie");
const logger = require("../winstonLogger");

//get all movies
routes.get("/", async (req, res, next) => {
  try {
    await Movie.find()
      .populate({ path: "genre", select: "name -_id", model: Genre })
      .exec(function(err, movie) {
        if (err) {
          console.log(err);
        }
        logger.log({
          level: "info",
          message: "get all movies"
        });
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
    const addedMovie = await newMovie.save();
    logger.log({
      level: "info",
      message: "add a new movie"
    });
    res.status(200).send(addedMovie);
  } catch (e) {
    next(e);
  }
});

//retrieve a movie based on id
routes.get("/:movieId", async (req, res, next) => {
  try {
    const movieId = req.params.movieId;
    const movie = await Movie.findOne({ _id: movieId });
    if (!movie) throw { message: "Movie not found" };
    logger.log({
      level: "info",
      message: "retrieve a movie"
    });
    res.status(200).send(movie);
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

    const updatedMovie = await Movie.findOneAndUpdate({ _id: movieId }, { $set: value }, { new: true });
    if (!updatedMovie) throw { message: "Movie not found" };
    logger.log({
      level: "info",
      message: "update a movie"
    });
    res.status(200).send(updatedMovie);
  } catch (e) {
    next(e);
  }
});

//delete a movie
routes.delete("/:movieId", async (req, res, next) => {
  try {
    const movieId = req.params.movieId;
    const deletedMovie = await Movie.findOneAndDelete({ _id: movieId });
    if (!deletedMovie) throw { message: "Movie not found" };
    logger.log({
      level: "info",
      message: "delete a movie"
    });
    res.status(200).send(deletedMovie);
  } catch (e) {
    next(e);
  }
});

module.exports = routes;
