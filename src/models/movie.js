const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  genre: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true
  },
  numberInStock: {
    type: Number,
    required: true
  },
  dailyRentalRate: {
    type: Number,
    required: true
  }
});
const Movie = mongoose.model("Movie", movieSchema);

module.exports = {
  Movie
};
