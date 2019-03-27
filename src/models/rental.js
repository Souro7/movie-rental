const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const rentalSchema = new Schema({
  customer: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true
  },
  movie: {
    type: [mongoose.Schema.Types.ObjectId],
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
const Rental = mongoose.model("Rental", rentalSchema);

module.exports = {
  Rental
};
