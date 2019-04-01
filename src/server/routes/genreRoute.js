const routes = require("express").Router();
const Joi = require("joi");

const { Genre, genreJoiSchema } = require("../../models/genre");
const logger = require("../winstonLogger");

//get all genres
routes.get("/", async (req, res, next) => {
  try {
    let genres = await Genre.find();
    res.status(200).send(genres);
    logger.log({
      level: "info",
      message: "get all genres"
    });
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
    res.status(200).send(response);
    logger.log({
      level: "info",
      message: "add a new genre"
    });
  } catch (e) {
    next(e);
  }
});

//retrieve a genre
routes.get("/:genreId", async (req, res, next) => {
  try {
    const genreId = req.params.genreId;
    await Genre.findOne({ _id: genreId }).then(response => {
      res.status(200).send(response);
      logger.log({
        level: "info",
        message: "retrieve a genre"
      });
    });
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
    await Genre.findOneAndUpdate({ _id: genreId }, { $set: value }, { new: true }).then(response => {
      res.status(200).send(response);
      logger.log({
        level: "info",
        message: "update a genre"
      });
    });
  } catch (e) {
    next(e);
  }
});

//delete a genre
routes.delete("/:genreId", async (req, res, next) => {
  try {
    const genreId = req.params.genreId;
    await Genre.findOneAndDelete({ _id: genreId }).then(response => {
      res.status(200).send(response);
      logger.log({
        level: "info",
        message: "delete a genre"
      });
    });
  } catch (e) {
    next(e);
  }
});

module.exports = routes;
