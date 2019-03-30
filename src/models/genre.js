const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const Schema = mongoose.Schema;

const genreSchema = new Schema({
  name: {
    type: String,
    minlength: 1,
    maxlength: 50,
    required: true
  }
});
const Genre = mongoose.model("genres", genreSchema);

const genreJoiSchema = Joi.object().keys({
  name: Joi.string()
    .trim()
    .required()
    .min(1)
    .max(50)
});
module.exports = {
  Genre,
  genreJoiSchema
};
