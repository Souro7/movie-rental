const routes = require("express").Router();
const Joi = require("joi");

const { Genre, genreJoiSchema } = require("../../models/genre");
const logger = require("../winstonLogger");

//get all genres
routes.get("/", async (req, res, next) => {
  try {
    let genres = await Genre.find();
    logger.log({
      level: "info",
      message: "get all genres"
    });
    res.status(200).send(genres);
  } catch (e) {
    next(e);
  }
});

//add a new genre
routes.post("/", async (req, res, next) => {
  try {
    let { name } = req.body;
    let { error, value } = Joi.validate({ name }, genreJoiSchema);
    if (error) res.status(400).send("error in request: " + error);

    const newGenre = new Genre(value);
    let response = await newGenre.save();
    logger.log({
      level: "info",
      message: "add a new genre"
    });
    res.status(200).send(response);
  } catch (e) {
    next(e);
  }
});

//retrieve a genre
routes.get("/:genreId", async (req, res, next) => {
  try {
    const genreId = req.params.genreId;
    const genre = await Genre.findOne({ _id: genreId });
    if (!genre) throw { message: "Genre doesnt exist" };
    logger.log({
      level: "info",
      message: "retrieve a genre"
    });
    res.status(200).send(genre);
  } catch (e) {
    next(e);
  }
});

//update details of a genre
routes.put("/:genreId", async (req, res, next) => {
  try {
    const genreId = req.params.genreId;
    let { name } = req.body;
    let { error, value } = Joi.validate({ name }, genreJoiSchema);
    if (error) res.status(400).send("error in request: " + error);
    const updatedGenre = await Genre.findOneAndUpdate({ _id: genreId }, { $set: value }, { new: true });
    if (!updatedGenre) throw { message: "Genre doesnt exist" };
    logger.log({
      level: "info",
      message: "update a genre"
    });
    res.status(200).send(updatedGenre);
  } catch (e) {
    next(e);
  }
});

//delete a genre
routes.delete("/:genreId", async (req, res, next) => {
  try {
    const genreId = req.params.genreId;
    const deletedGenre = await Genre.findOneAndDelete({ _id: genreId });
    if (!deletedGenre) throw { message: "Genre doesnt exist" };
    logger.log({
      level: "info",
      message: "delete a genre"
    });
    res.status(200).send(deletedGenre);
  } catch (e) {
    next(e);
  }
});

module.exports = routes;
