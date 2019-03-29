const routes = require("express").Router();
const { Genre } = require("../../models/genre");
const { Movie } = require("../../models/movie");

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
routes.post("/api/movies", (req, res) => {
  const title = req.body.title;
  const genre = req.body.genre;
  const numberInStock = req.body.numberInStock;
  const dailyRentalRate = req.body.dailyRentalRate;
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
  const title = req.body.title;
  const genre = req.body.genre;
  const numberInStock = req.body.numberInStock;
  const dailyRentalRate = req.body.dailyRentalRate;

  let movie = {
    title,
    genre,
    numberInStock,
    dailyRentalRate
  };

  await Movie.findOneAndUpdate({ _id: movieId }, { $set: movie }, { new: true }).then(response => {
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
