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
    min: 1,
    required: true
  }
});
const Rental = mongoose.model("rentals", rentalSchema);

module.exports = {
  Rental
};
