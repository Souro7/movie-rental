const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const Schema = mongoose.Schema;

const rentalSchema = new Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true
  },
  dateIssued: {
    type: Date,
    required: true
  },
  dateReturned: {
    type: Date
  },
  rentalFee: {
    type: Number,
    required: true
  }
});
const Rental = mongoose.model("rentals", rentalSchema);

const rentalJoiSchema = Joi.object().keys({
  customer: Joi.objectId().required(),
  movie: Joi.objectId().required(),
  dateIssued: Joi.date().required(),
  dateReturned: Joi.date(),
  rentalFee: Joi.number()
});

module.exports = {
  Rental,
  rentalJoiSchema
};
