const routes = require("express").Router();
const { Genre, genreJoiSchema } = require("../../models/genre");

//get all genres
routes.get("/", async (req, res) => {
  let genres = await Genre.find();
  res.status(200).send(genres);
});

//add a new genre
routes.post("/", async (req, res) => {
  let { name } = req.body;
  const newGenre = new Genre({ name });
  let response = await newGenre.save();
  res.status(200).send(response);
});

//retrieve a genre
routes.get("/:genreId", async (req, res) => {
  const genreId = req.params.genreId;
  await Genre.findOne({ _id: genreId }).then(response => {
    res.status(200).send(response);
  });
});

//update details of a genre
routes.put("/:genreId", async (req, res) => {
  const genreId = req.params.genreId;
  let { name } = req.body;
  await Genre.findOneAndUpdate({ _id: genreId }, { $set: { name } }, { new: true }).then(response => {
    res.status(200).send(response);
  });
});

//delete a genre
routes.delete("/:genreId", async (req, res) => {
  const genreId = req.params.genreId;
  await Genre.findOneAndDelete({ _id: genreId }).then(response => {
    res.status(200).send(response);
  });
});

module.exports = routes;
