const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/movie-rental", { useNewUrlParser: true });

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to database..");
});

const Movie = mongoose.model("Movie", { title: String, genre: String, numberInStock: Number, dailyRentalRate: Number });

// const newMovie = new Movie({ title: "Badla", genre: "Drama", numberInStock: "10", dailyRentalRate: "50" });
// newMovie.save().then(data => console.log(data));
