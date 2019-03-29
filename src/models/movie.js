const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: {
    type: String,
    minlength: 1,
    maxlength: 100,
    required: true
  },
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Genre",
    required: true
  },
  numberInStock: {
    type: Number,
    min: 0,
    max: 999,
    required: true
  },
  dailyRentalRate: {
    type: Number,
    min: 20,
    max: 500,
    required: true
  }
});
const Movie = mongoose.model("movies", movieSchema);

const movieJoiSchema = Joi.object().keys({
  title: Joi.string()
    .trim()
    .required()
    .min(1)
    .max(100),
  genre: Joi.objectId().required(),
  numberInStock: Joi.number()
    .required()
    .min(0)
    .max(999),
  dailyRentalRate: Joi.number()
    .required()
    .min(20)
    .max(500)
});

module.exports = {
  Movie,
  movieJoiSchema
};
